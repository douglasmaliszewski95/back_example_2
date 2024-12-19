import * as _ from 'lodash';
import * as aws from 'aws-sdk';

interface Config {
  awsAccesskeyID: string;
  awsSecretAccessKey: string;
  awsRegion: string;
}

interface Relationship {
  Type: string;
  Ids: string[];
}

interface Block {
  Id: string;
  BlockType: string;
  EntityTypes?: string[];
  Text?: string;
  SelectionStatus?: string;
  Relationships?: Relationship[];
}

interface AnalyzeDocumentResponse {
  Blocks?: Block[];
}

class TextExtractor {
  private textract: aws.Textract;

  constructor(config: Config) {
    aws.config.update({
      accessKeyId: config.awsAccesskeyID,
      secretAccessKey: config.awsSecretAccessKey,
      region: config.awsRegion,
    });

    this.textract = new aws.Textract();
  }

  async analyzeDocument(buffer: Buffer): Promise<AnalyzeDocumentResponse> {
    const params: aws.Textract.AnalyzeDocumentRequest = {
      Document: {
        Bytes: buffer,
      },
      FeatureTypes: ['FORMS'],
    };

    const request = this.textract.analyzeDocument(params);

    const data = await request.promise();

    return data as AnalyzeDocumentResponse;
  }
}

class TextProcessor {
  private readonly blockMap: Record<string, Block> = {};
  private readonly keyMap: Record<string, Block> = {};
  private readonly valueMap: Record<string, Block> = {};
  private readonly extractMap: Record<string, Block> = {};

  constructor(private readonly blocks: Block[]) {
    this.initializeBlockMaps();
  }

  private initializeBlockMaps(): void {
    this.blocks.forEach((block) => {
      this.blockMap[block.Id] = block;
      if (block.BlockType === 'LINE') {
        if (_.includes(block.EntityTypes, 'KEY')) {
          this.extractMap[block.Id] = block;
        } else {
          this.extractMap[block.Id] = block;
        }
      }

      if (block.BlockType === 'KEY_VALUE_SET') {
        if (_.includes(block.EntityTypes, 'KEY')) {
          this.keyMap[block.Id] = block;
        } else {
          this.valueMap[block.Id] = block;
        }
      }
    });
  }

  private getItens(itens: any): any {
    let text = '';

    if (itens.BlockType === 'LINE') {
      const word = this.extractMap[itens.Id];

      if (word.BlockType === 'LINE') {
        text += `${word.Text}`;
      }
    }

    return text.trim();
  }

  private getText(result: any, blocksMap: Record<string, Block>): string {
    let text = '';

    if (_.has(result, 'Relationships')) {
      result.Relationships.forEach((relationship: any) => {
        if (relationship.Type === 'CHILD') {
          relationship.Ids.forEach((childId: any) => {
            const word = blocksMap[childId];

            if (word.BlockType === 'WORD') {
              text += `${word.Text} `;
            }

            if (word.BlockType === 'SELECTION_ELEMENT') {
              if (word.SelectionStatus === 'SELECTED') {
                text += `X `;
              }
            }
          });
        }
      });
    }

    return text.trim();
  }

  private findValueBlock(keyBlock: Block): Block | undefined {
    let valueBlock: Block | undefined;

    keyBlock.Relationships?.forEach((relationship) => {
      if (relationship.Type === 'VALUE') {
        relationship.Ids.some((valueId) => {
          if (_.has(this.valueMap, valueId)) {
            valueBlock = this.valueMap[valueId];
            return true;
          }
          return false;
        });
      }
    });

    return valueBlock;
  }

  private getValueBlock(keyBlock: Block): Block | undefined {
    let valueBlock: Block | undefined;

    if (_.has(this.extractMap, keyBlock.Id)) {
      valueBlock = this.extractMap[keyBlock.Id];
    }

    return valueBlock;
  }

  private getKeyValueRelationship(): Record<string, string> {
    const keyValues: Record<string, string> = {};

    const keyMapValues = _.values(this.keyMap);

    keyMapValues.forEach((keyMapValue: any) => {
      const valueBlock = this.findValueBlock(keyMapValue);
      const key = this.getText(keyMapValue, this.blockMap);
      const value = valueBlock ? this.getText(valueBlock, this.blockMap) : '';

      keyValues[key] = value;
    });

    return keyValues;
  }

  private getValueRelationship(): Record<string, string> {
    let extractText = '';
    const keyValues: Record<string, string> = {};
    const text: any = [];
    const keyMapValues = _.values(this.extractMap);

    keyMapValues.forEach((item, index) => {
      const valueBlock = this.getValueBlock(item);
      const value = this.getItens(valueBlock);

      extractText += `${value} `;

      text.push(value);

      keyValues[index] = value;
    });

    const returnData = {
      data: text,
      extractText,
    };

    return returnData;
  }

  processText(): Record<string, string> {
    const data = {
      text: this.getKeyValueRelationship(),
      values: this.getValueRelationship(),
    };

    return data as any;
  }
}

class DocumentAnalyzer {
  constructor(private readonly textExtractor: TextExtractor) {}

  async analyzeDocument(buffer: Buffer): Promise<Record<string, string> | undefined> {
    const data = await this.textExtractor.analyzeDocument(buffer);

    if (data && data.Blocks) {
      const textProcessor = new TextProcessor(data.Blocks);

      return textProcessor.processText();
    }

    return undefined;
  }
}

function searchRules(text: string, listRules: any): string[] {
  const wordsFound: string[] = [];

  for (const rule of listRules) {
    const upperCaseRuleName = rule.name.toUpperCase();

    if (text.includes(upperCaseRuleName)) {
      wordsFound.push(upperCaseRuleName);
    }
  }

  return wordsFound;
}

function searchKey<T>(array: Record<string, T>[], chaves: string[]): string[] {
  const keyFounds: string[] = [];

  for (const chave of chaves) {
    const key = array.find((item) => Object.keys(item).includes(chave));

    if (key) {
      keyFounds.push(String(key[chave]));
    }
  }

  return keyFounds;
}

export { TextExtractor, TextProcessor, DocumentAnalyzer, searchRules, searchKey };
