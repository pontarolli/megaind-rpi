# Calibration

## Current IO 
```console
# Pin 1, 2, 3, 4 ok

# Before I checked if it was not already calibrated in the console and in the multimeter and all the values were with some difference then I needed to calibrate.

# Example calibration pin 3 output
pi@raspberrypi:~/Public $ megaind 0 ioutwr 3 4.500
done
pi@raspberrypi:~/Public $ megaind 0 ioutcal 3 4.490
Calibration in progress
pi@raspberrypi:~/Public $ megaind 0 ioutwr 3 19.500
done
pi@raspberrypi:~/Public $ megaind 0 ioutcal 3 19.500
Calibration done
pi@raspberrypi:~/Public $ megaind 0 ioutwr 3 4.500
done
pi@raspberrypi:~/Public $ megaind 0 ioutwr 3 19.500
done

# Example calibration pin 3 input
pi@raspberrypi:~/Public $ megaind 0 ioutwr 3 4.500
done
pi@raspberrypi:~/Public $ megaind 0 iinrd 3
4.567
pi@raspberrypi:~/Public $ megaind 0 iincal 3 4.500
Calibration in progress
pi@raspberrypi:~/Public $ megaind 0 ioutwr 3 19.500
done
pi@raspberrypi:~/Public $ megaind 0 iincal 3 19.500
Calibration done
pi@raspberrypi:~/Public $ megaind 0 iinrd 3
19.494
pi@raspberrypi:~/Public $ megaind 0 ioutwr 3 4.500
done
pi@raspberrypi:~/Public $ megaind 0 iinrd 3
4.500
```

## Voltage
```console
# Pin 1, 2, 3, 4 ok

# Before I checked that it was not already calibrated in the console and in the multimeter and all the values were good. So I didn't have to calibrate.

pi@raspberrypi:~/Public $ megaind 0 uoutwr 1 1.5
done
pi@raspberrypi:~/Public $ megaind 0 uoutwr 2 1.5
done
pi@raspberrypi:~/Public $ megaind 0 uoutwr 3 1.5
done
pi@raspberrypi:~/Public $ megaind 0 uoutwr 4 1.5
done

pi@raspberrypi:~/Public $ megaind 0 uinrd 1
1.498
pi@raspberrypi:~/Public $ megaind 0 uinrd 2
1.493
pi@raspberrypi:~/Public $ megaind 0 uinrd 3
1.490
pi@raspberrypi:~/Public $ megaind 0 uinrd 4
1.493


pi@raspberrypi:~/Public $ megaind 0 uoutwr 4 9.50
done
pi@raspberrypi:~/Public $ megaind 0 uoutwr 3 9.50
done
pi@raspberrypi:~/Public $ megaind 0 uoutwr 2 9.50
done
pi@raspberrypi:~/Public $ megaind 0 uoutwr 1 9.50
done

pi@raspberrypi:~/Public $ megaind 0 uinrd 1
9.515
pi@raspberrypi:~/Public $ megaind 0 uinrd 2
9.511
pi@raspberrypi:~/Public $ megaind 0 uinrd 3
9.503
pi@raspberrypi:~/Public $ megaind 0 uinrd 4
9.521
```