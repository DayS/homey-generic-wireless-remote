'use strict';

const { RFError, RFSignal, RFUtil } = require('homey-rfdriver');

export type Command = {
  address: string;
  btn: string;
}

/**
 * 433Mhz Princeton signal description
 *
 * Example payload: 01010100000111101000  1000
 *                  address (20 bit)      btn (4 bits)
 *
 */
export class MySignal extends RFSignal {

  static readonly FREQUENCY = '433';
  static readonly ID = 'princeton_24bits';

  static commandToDeviceData(command: any) {
    return {
      address: command.address,
      btn: command.btn,
    };
  }

  static commandToPayload(command: Command) {
    if (command.address.length !== 20) {
      throw new RFError(`Invalid Address: ${command.address}`);
    }
    if (command.btn.length !== 4) {
      throw new RFError(`Invalid Btn: ${command.btn}`);
    }

    console.log('Command: ', command.address, command.btn);

    return [].concat(
      RFUtil.bitStringToBitArray(command.address),
      RFUtil.bitStringToBitArray(command.btn),
    );
  }

  static payloadToCommand(payload: number[]): Command {
    console.log('Payload:', payload.join(''));

    const address = String(payload.slice(0, 20).join(''));
    const btn = String(payload.slice(20, 24).join(''));

    return {
      address,
      btn,
    };
  }

  static createPairCommand() {
    return {
      address: RFUtil.generateRandomBitString(20),
      btn: RFUtil.generateRandomBitString(4),
    };
  }

}
