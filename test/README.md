# Raspberrypi terminal test IO

First install megaind
https://github.com/SequentMicrosystems/megaind-rpi

## Current IO 
```console
# output
pi@raspberrypi:~/Public $ megaind 0 ioutwr 1 8
done
pi@raspberrypi:~/Public $ megaind 0 ioutwr 1 5
done
pi@raspberrypi:~/Public $ megaind 0 ioutwr 2 6
done
pi@raspberrypi:~/Public $ megaind 0 ioutwr 3 7
done
pi@raspberrypi:~/Public $ megaind 0 ioutwr 4 8

# input
done
pi@raspberrypi:~/Public $ megaind 0 iinrd 1
5.020
pi@raspberrypi:~/Public $ megaind 0 iinrd 2
6.005
pi@raspberrypi:~/Public $ megaind 0 iinrd 3
6.971
pi@raspberrypi:~/Public $ megaind 0 iinrd 4
8.037
```

## Voltage IO
```console
# output
pi@raspberrypi:~/Public $ megaind 0 uoutwr 1 1
done
pi@raspberrypi:~/Public $ megaind 0 uoutwr 2 2
done
pi@raspberrypi:~/Public $ megaind 0 uoutwr 3 3
done
pi@raspberrypi:~/Public $ megaind 0 uoutwr 4 4
done

# input
pi@raspberrypi:~/Public $ megaind 0 uoutrd 1
1.000
pi@raspberrypi:~/Public $ megaind 0 uoutrd 2
2.000
pi@raspberrypi:~/Public $ megaind 0 uoutrd 3
3.000
pi@raspberrypi:~/Public $ megaind 0 uoutrd 4
4.000
```

## Opend-Drain and Optos IO
```console
# output
pi@raspberrypi:~/Public $ megaind 0 odwr 1 0
done
pi@raspberrypi:~/Public $ megaind 0 odwr 2 0
done
pi@raspberrypi:~/Public $ megaind 0 odwr 3 0
done
pi@raspberrypi:~/Public $ megaind 0 odwr 4 0
done

# input
pi@raspberrypi:~/Public $ megaind 0 optord 1
0
pi@raspberrypi:~/Public $ megaind 0 optord 2
0
pi@raspberrypi:~/Public $ megaind 0 optord 3
0
pi@raspberrypi:~/Public $ megaind 0 optord 4
0

# output
pi@raspberrypi:~/Public $ megaind 0 odwr 1 100
done
pi@raspberrypi:~/Public $ megaind 0 odwr 2 100
done
pi@raspberrypi:~/Public $ megaind 0 odwr 3 100
done
pi@raspberrypi:~/Public $ megaind 0 odwr 4 100
done

# input
pi@raspberrypi:~/Public $ megaind 0 optord 1
1
pi@raspberrypi:~/Public $ megaind 0 optord 2
1
pi@raspberrypi:~/Public $ megaind 0 optord 3
1
pi@raspberrypi:~/Public $ megaind 0 optord 4
1

# To see pwm see leds on the board or plug oscilloscope
pi@raspberrypi:~/Public $ megaind 0 odwr 1 25
done
pi@raspberrypi:~/Public $ megaind 0 odwr 2 50
done
pi@raspberrypi:~/Public $ megaind 0 odwr 3 75
done
pi@raspberrypi:~/Public $ megaind 0 odwr 4 100
done
```
