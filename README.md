
# megaind-rpi

This is the javascript library to control the [Industrial Automation Stackable Card for Raspberry Pi](https://sequentmicrosystems.com/product/raspberry-pi-industrial-automation/) using framework Moleculer. 

## Setup

Enable I2C communication first:
```bash
~$ sudo raspi-config
```

## Install

```bash
# 1. nats:2.1.7-linux
# Run a container tranporter in localhost available at https://hub.docker.com/_/nats?tab=tags&page=1&ordering=last_updated&name=2.1.7-linux
# nats://localhost:4222
~$ docker run -d --name nats -p 4222:4222 nats:2.1.7-linux

# 2. api service
~$ git clone https://github.com/pontarolli/api
~$ cd api/simple
~$ npm install
~$ node api.service.js

# 3. megaind-rpi service
~$ git clone https://github.com/pontarolli/megaind-rpi.git
~$ cd megaind-rpi/
~$ npm install
~$ npm run dev
~$ mol $ ...
```

## Usage

# Voltages IO


## setOutputVoltage 

    Write 0-10V output voltage value (V)

Usage  : 

    megaind-rpi.setOutputVoltage --stack <id> --channel <channel> --value <value>

Params: 

    stack   - stack level of the megaind card (selectable from address jumpers [0..7])
    channel - selected channel number [1..4]
    value   - percentage of 0 to 10V [0..100]

Return: 

     0 (Succes)
    -1 (Error)

Example: 

    # Write 2.5V to 0-10V output channel 2 on Board 0
    mol $ call megaind-rpi.setOutputVoltage --stack 0 --channel 2 --value 25
    mol $ 0
    
    # If use api gateway
    # Try whit terminal
    ~$ curl --header "Content-Type: application/json" --request POST --data '{"stack":0,"channel":2, "value": 25}' http://localhost:3000/megaind-rpi.setOutputVoltage?
    # Try with Postman (https://www.postman.com/downloads/)
    
    POST http://localhost:3000/megaind-rpi.setOutputVoltage?
    
    Header
    {
        "Content-Type": "application/json"
    }

    Body
    {
        "stack": 0,
        "channel": 2,
        "value": 25
    }


## getOutputVoltage

    Read 0-10V Output voltage value(V)

Usage  : 

    megaind-rpi.getOutputVoltage --stack <id> --channel <channel> 

Params: 

    stack   - stack level of the megaind card (selectable from address jumpers [0..7])
    channel - selected channel number [1..4]

Return: 
    
    Percentage of 0 to 10V [0..100]

Example:
     
    # Read the voltage on 0-10V out channel 2 on Board 0 
    mol $ call megaind-rpi.getOutputVoltage --stack 0 --channel 2
    mol $ 25

## getInputVoltage: 

    Read 0-10V input voltage value (V)

Usage  : 

    megaind-rpi.getInputVoltage --stack <id> --channel <channel>

Params: 

    stack   - stack level of the megaind card (selectable from address jumpers [0..7])
    channel - selected channel number [1..4]

Return: 
    
    Percentage of 0 to 10V [0..100]

Example: 

    # Read the voltage input on 0-10V in channel 2 on Board 0
    mol $ call megaind-rpi.getInputVoltage --stack 0 --channel 2
    mol $ 25
    


# Currents IO


## setOutputCurrent

    Write 4-20mA output value (mA)

Usage  : 

    megaind-rpi.setOutputCurrent --stack <id> --channel <channel> --value <value>

Params: 

    stack   - stack level of the megaind card (selectable from address jumpers [0..7])
    channel - selected channel number [1..4]
    value   - percentage of 4 to 20mA [0..100]

Return: 

     0 (Succes)
    -1 (Error)

Example:

    # Set 10.5mA to 4-20mA output channel 2 on Board 0
    mol $ call megaind-rpi.setOutputCurrent --stack 0 --channel 2 --value 65.62
    mol $ 0


## getOutputCurrent 

    Read 4-20mA Output current value (mA)

Usage  : 

    megaind-rpi.getOutputCurrent --stack <id> --channel <channel> 

Params: 

    stack   - stack level of the megaind card (selectable from address jumpers [0..7])
    channel - selected channel number [1..4]

Return: 
    
    Percentage of 4 to 20mA [0..100]

Example:
    
    # Read the current on 4-20mA out channel 2 on Board 0
    mol $ call megaind-rpi.getOutputCurrent --stack 0 --channel 2
    mol $ 65.62


## getInputCurrent 

    Read 4-20mA input value (mA)

Usage  :

    megaind-rpi.getInputCurrent --stack <id> --channel <channel>

Params: 

    stack   - stack level of the megaind card (selectable from address jumpers [0..7])
    channel - selected channel number [1..4]

Return: 
    
    Percentage of 4 to 20mA [0..100]

Example: 

    # Read the voltage input on 4-20mA in channel 2 on Board 0
    mol $ call megaind-rpi.getInputCurrent --stack 0 --channel 2 
    mol $ 65.36


# Analog Out and Digital In

## setOutputOpenDrain

    Write open-drain output PWM value (0..100%)

Usage  : 

    megaind-rpi.setOutputOpenDrain --stack <id> --channel <channel> --value <value>

Params: 

    stack   - stack level of the megaind card (selectable from address jumpers [0..7])
    channel - selected channel number [1..4]
    value   - percentage of 0 to 24V PWM [0..100]

Return: 

     0 (Succes)
    -1 (Error)

Example: 

    # Set PWM 10.5% to open-drain output channel 2 on Board 0
    mol $ call megaind-rpi.setOutputOpenDrain --stack 0 --channel 2 --value 10.5
    mol $ 0
    


## getOutputOpenDrain

    Read open-drain Output PWM value(0..100%)

Usage  : 

    megaind-rpi.getOutputOpenDrain --stack <id> --channel <channel>

Params: 

    stack   - stack level of the megaind card (selectable from address jumpers [0..7])
    channel - selected channel number [1..4]

Return: 
    
    Percentage of 0 to 24V PWM [0..100]

Example: 

    # Read the PWM value on open-drain output channel 2 on Board 0
    mol $ call megaind-rpi.getOutputOpenDrain --stack 0 --channel 2
    mol $ 10.5

## getInputOpto

    Read dry opto status

Usage  : 
    
    megaind-rpi.getInputOpto --stack <id> --channel <channel>

Params: 

    stack   - stack level of the megaind card (selectable from address jumpers [0..7])
    channel - selected channel number [1..4]

Return: 

     0 (OFF)
     1 (ON)

Example: 

    # Read Status of opto input pin 2 on Board 0
    mol $ call megaind-rpi.getInputOpto --stack 0 --channel 2
    mol $ 1

# Diagnose


## getBoardDiagnose

    Display infos about the board, firmware version, power and temperature.

Usage:
           
    megaind-rpi.getBoardDiagnose --stack <id>

Params: 

    stack   - stack level of the megaind card (selectable from address jumpers [0..7])

Return: 

     {
         firmware: version,
         power: voltage (V),
         temperature: cpu (ºC)
     }

Example         : 

    mol $ call megaind-rpi.getBoardDiagnose --stack 0
    mol $ {firmware: 1.04, power: 23.537, temperature: 44 }


## getRtc 

    Get the internal RTC  date and time UTC and Local

Usage  : 

    megaind-rpi.getRtc --stack <id>

Params: 

    stack   - stack level of the megaind card (selectable from address jumpers [0..7])

Return: 

     {
         utc: date (Universal),
         local: date (Brazil),
     }

Example: 

    # Get the internal RTC time and date on Board 0
    mol $ call megaind-rpi.getRtc --stack 0
    mol $ {
            utc: 2021-05-27T19:01:48.000Z,
            local: 'quinta-feira, 27 de maio de 2021 16:01:48 Horário Padrão de Brasília'
    }

