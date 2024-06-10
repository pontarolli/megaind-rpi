"use strict";
var riin2 = 0

const i2c = require('i2c-bus')

const I2C_MEM_OPTO_IN_VAL = 3
const I2C_MEM_U0_10_OUT_VAL1 = 4
const I2C_MEM_I4_20_OUT_VAL1 = 12
const I2C_MEM_OD_PWM1 = 20
const I2C_MEM_U0_10_IN_VAL1 = 28
const I2C_MEM_I4_20_IN_VAL1 = 44
const I2C_RTC_YEAR_ADD = 70
const DEFAULT_HW_ADD = 80
const I2C_MEM_DIAG_TEMPERATURE = 114

const ERROR = -1
const OK = 0

const ON = 1
const OFF = 0

module.exports = {

    name: process.env.NAME || "megand-rpi",

    actions: {

        setOutputVoltage: {
            // params: {
            //     stack: { type: "number", integer: true, min: 0, max: 7 },
            //     channel: { type: "number", integer: true, min: 1, max: 4 },
            //     value: { type: "number", min: 0, max: 100 }
            // },

            async handler(ctx) { 

                ctx.params.stack = Number(ctx.params.stack)
                ctx.params.channel = Number(ctx.params.channel)
                ctx.params.value = Number(ctx.params.value)

                return await this.setMemoryWord(I2C_MEM_U0_10_OUT_VAL1, ctx.params.stack, ctx.params.channel, this.percentageToVoltage(ctx.params.value)) 
            }
        },
        getOutputVoltage: {
            // params: {
            //     stack: { type: "number", integer: true, min: 0, max: 7 },
            //     channel: { type: "number", integer: true, min: 1, max: 4 }
            // },
            async handler(ctx) {

                ctx.params.stack = Number(ctx.params.stack)
                ctx.params.channel = Number(ctx.params.channel)

                let voltage = await this.getMemoryWord(I2C_MEM_U0_10_OUT_VAL1, ctx.params.stack, ctx.params.channel)
                let percentage = this.voltageToPercentage(voltage)
                return percentage
            }
        },
        getInputVoltage: {
            // params: {
            //     stack: { type: "number", integer: true, min: 0, max: 7 },
            //     channel: { type: "number", integer: true, min: 1, max: 4 }
            // },
            async handler(ctx) {
                ctx.params.stack = Number(ctx.params.stack)
                ctx.params.channel = Number(ctx.params.channel)
                let voltage = await this.getMemoryWord(I2C_MEM_U0_10_IN_VAL1, ctx.params.stack, ctx.params.channel)
                let percentage = this.voltageToPercentage(voltage)
                return percentage
            }
        },

        setOutputCurrent: {
            // params: {
            //     stack: { type: "number", integer: true, min: 0, max: 7 },
            //     channel: { type: "number", integer: true, min: 1, max: 4 },
            //     value: { type: "number", min: 0, max: 100 }
            // },
            async handler(ctx) { 
                ctx.params.stack = Number(ctx.params.stack)
                ctx.params.channel = Number(ctx.params.channel)
                ctx.params.value = Number(ctx.params.value)
                // return await this.setMemoryWord(I2C_MEM_I4_20_OUT_VAL1, ctx.params.stack, ctx.params.channel, this.percentageToCurrent(ctx.params.value / 10)) 
                return await this.setMemoryWord(I2C_MEM_I4_20_OUT_VAL1, ctx.params.stack, ctx.params.channel, this.percentageToCurrent(ctx.params.value)) 
            }
        },
        getOutputCurrent: {
            // params: {
            //     stack: { type: "number", integer: true, min: 0, max: 7 },
            //     channel: { type: "number", integer: true, min: 1, max: 4 }
            // },

            async handler(ctx) {
                ctx.params.stack = Number(ctx.params.stack)
                ctx.params.channel = Number(ctx.params.channel)
                let current = await this.getMemoryWord(I2C_MEM_I4_20_OUT_VAL1, ctx.params.stack, ctx.params.channel)
                let percentage = this.currentToPercentage(current)
                return percentage
            }
        },
        getInputCurrent: {
            // params: {
            //     stack: { type: "number", integer: true, min: 0, max: 7 },
            //     channel: { type: "number", integer: true, min: 1, max: 4 }
            // },

            async handler(ctx) {
                ctx.params.stack = Number(ctx.params.stack)
                ctx.params.channel = Number(ctx.params.channel)
                let current = await this.getMemoryWord(I2C_MEM_I4_20_IN_VAL1, ctx.params.stack, ctx.params.channel)
                let percentage = this.currentToPercentage(current)
                return percentage
            }
        },

        setOutputOpenDrain: {
            // params: {
            //     stack: { type: "number", integer: true, min: 0, max: 7 },
            //     channel: { type: "number", integer: true, min: 1, max: 4 },
            //     value: { type: "number", min: 0, max: 100 }
            // },
            async handler(ctx) { 
                ctx.params.stack = Number(ctx.params.stack)
                ctx.params.channel = Number(ctx.params.channel)
                ctx.params.value = Number(ctx.params.value)
                return await this.setMemoryWord(I2C_MEM_OD_PWM1, ctx.params.stack, ctx.params.channel, ctx.params.value / 10) }
        },
        getOutputOpenDrain: {
            // params: {
            //     stack: { type: "number", integer: true, min: 0, max: 7 },
            //     channel: { type: "number", integer: true, min: 1, max: 4 }
            // },
            async handler(ctx) {
                ctx.params.stack = Number(ctx.params.stack)
                ctx.params.channel = Number(ctx.params.channel)
                return +(10 * await this.getMemoryWord(I2C_MEM_OD_PWM1, ctx.params.stack, ctx.params.channel)).toFixed(2)
            }
        },
        getInputOpto: {
            // params: {
            //     stack: { type: "number", integer: true, min: 0, max: 7 },
            //     channel: { type: "number", integer: true, min: 1, max: 4 }
            // },
            async handler(ctx) { 
                ctx.params.stack = Number(ctx.params.stack)
                ctx.params.channel = Number(ctx.params.channel)
                return await this.getMemoryByte(I2C_MEM_OPTO_IN_VAL, ctx.params.stack, ctx.params.channel) }
        },

        getBoardDiagnose: {
            // params: {
            //     stack: { type: "number", integer: true, min: 0, max: 7 },
            // },
            async handler(ctx) {
                ctx.params.stack = Number(ctx.params.stack)
                let addr = DEFAULT_HW_ADD + ctx.params.stack
                let cmd = I2C_MEM_DIAG_TEMPERATURE
                let length = 8
                let buffer = Buffer.alloc(8)
                let rawData = await this.readI2cBlock(addr, cmd, length, buffer)
                let major = rawData.buffer.readIntLE(6, 1)
                let minor = rawData.buffer.readIntLE(7, 1)
                let megaind = {}
                megaind.firmware = major + minor / 100.0
                megaind.power = rawData.buffer.readIntLE(1, 2) / 1000.0
                megaind.temperature = rawData.buffer.readIntLE(0, 1)
                let value = megaind
                return value
            }
        },
        getRtc: {
            // params: {
            //     stack: { type: "number", integer: true, min: 0, max: 7 },
            // },
            async handler(ctx) {
                ctx.params.stack = Number(ctx.params.stack)

                let addr = DEFAULT_HW_ADD + ctx.params.stack
                let cmd = I2C_RTC_YEAR_ADD
                let length = 6
                let buffer = Buffer.alloc(6)
                let rawData = await this.readI2cBlock(addr, cmd, length, buffer)
                let rtc = {}
                let year = rawData.buffer.readIntLE(0, 1) + 2000
                let month = rawData.buffer.readIntLE(1, 1)  // An integer value that represents the month, starting with January 0 through December 11.
                let day = rawData.buffer.readIntLE(2, 1)
                let hour = rawData.buffer.readIntLE(3, 1)
                let minute = rawData.buffer.readIntLE(4, 1)
                let second = rawData.buffer.readIntLE(5, 1)

                rtc.utc = new Date(Date.UTC(year, month, day, hour, minute, second));

                const option = {
                    year: 'numeric',
                    month: ('long' || 'short' || 'numeric'),
                    weekday: ('long' || 'short'),
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    // era         : ('long' || 'short'),
                    timeZoneName: ('long' || 'short')
                }

                const locale = 'pt-br'
                rtc.local = rtc.utc.toLocaleDateString(locale, option)

                let value = rtc
                return value
            }
        },
    },

    methods: {
        async setMemoryWord(i2cAddr, stack, channel, value) {
            let addr = DEFAULT_HW_ADD + stack
            let cmd = i2cAddr + (channel - 1) * 2
            let word = value * 1000 // range 0 to 65535 in word but in the program range 0 to 10000 is equal 0 to 10V if its voltage, if its current 4 to 20mA
            let status = await this.writeWord(addr, cmd, word)
            return status
        },
        async writeWord(addr, cmd, word) {
            return await i2c.openPromisified(1)
                .then(i2c1 => i2c1.writeWord(addr, cmd, word)
                    .then(_ => {
                        i2c1.close()
                        return OK
                    })
                )
                .catch(error => {
                    console.error(`Error occured! ${error.message}`)
                    return ERROR
                })
        },
        async writeByte(addr, cmd, byte) {
            return await i2c.openPromisified(1)
                .then(i2c1 => i2c1.writeByte(addr, cmd, byte)
                    .then(_ => {
                        i2c1.close()
                        return OK
                    })
                )
                .catch(error => {
                    console.logger.error(`Error occured! ${error.message}`)
                    return ERROR
                })
        },
        async getMemoryWord(i2cAddr, stack, channel) {
            let addr = DEFAULT_HW_ADD + stack
            let cmd = i2cAddr + (channel - 1) * 2
            let rawData = await this.readWord(addr, cmd)
            console.log(rawData)
            let value = rawData / 1000
            return value
        },
        async getMemoryByte(i2cAddr, stack, channel) {
            let addr = DEFAULT_HW_ADD + stack
            let cmd = i2cAddr
            let rawData = await this.readByte(addr, cmd)
            let value = this.toChannel(rawData, channel)
            return value
        },
        async readI2cBlock(addr, cmd, length, buffer) {
            return await i2c.openPromisified(1)
                .then(i2c1 => i2c1.readI2cBlock(addr, cmd, length, buffer)
                    .then(rawData => {
                        i2c1.close()
                        return rawData
                    })
                )
                .catch(error => {
                    console.logger.error(`Error occured! ${error.message}`)
                    return ERROR
                })
        },
        async readWord(addr, cmd) {
            return await i2c.openPromisified(1)
                .then(i2c1 => i2c1.readWord(addr, cmd)
                    .then(rawData => {
                        i2c1.close()
                        return rawData
                    })
                )
                .catch(error => {
                    console.logger.error(`Error occured! ${error.message}`)
                    return ERROR
                })
        },
        async readByte(addr, cmd) {
            return await i2c.openPromisified(1)
                .then(i2c1 => i2c1.readByte(addr, cmd)
                    .then(rawData => {
                        i2c1.close()
                        return rawData
                    })
                )
                .catch(error => {
                    console.logger.error(`Error occured! ${error.message}`)
                    return ERROR
                })
        },
        toChannel(rawData, channel) {
            if ((1 << (channel - 1)) & rawData) {
                return ON
            }
            return OFF
        },
        percentageToVoltage(percentage) {
            return +(percentage / 10).toFixed(2)
        },
        voltageToPercentage(voltage) {
            return +(voltage * 10).toFixed(2)
        },
        percentageToCurrent(percentage) {
            return +((percentage * 0.16) + 4).toFixed(2)
        },
        currentToPercentage(current) {
            let percentage = +((current -4 )* 6.25).toFixed(2)
            switch (true) {
                case (percentage < 0):
                    percentage = 0;
                    break;
                case (percentage > 100):
                    percentage = 100;
                    break;
            }
            return percentage;
        },

        // currentToPercentage(current){
        //     return +(current*6.25).toFixed(2)
        // },

        percentageToBar(percentage){
            return +((percentage/100)*2.5).toFixed(2)
        },
    }
}