## The Specifics 

Write a program that a user can run from the command line which reads a .csv containing water quality measurements for a pond and outputs *alerts* for water measurements that are out of spec.

### Data format

We've provided you with a sample .csv (comma-separated values) file, entitled `pond_data.csv`. It looks something like:

    Hour,DO,pH
    0,2,24
    1,2,25
    2,3,25
    3,3,25
    ...

The columns are:
 - **Hour**: from 0 to 23, indicates the hour of the day that this measurement was taken
 - **DO**: the concentration of dissolved oxygen in the water (measured in mg/L). This is a critical aspect of water quality in aquaculture - if there is not enough oxygen dissolved in the water, the crop will die.
 - **pH**: the acidity of the water (measured in units of pH). This affects aquaculture crops in numerous subtle and not-so-subtle ways.

### The alerts

Please implement the following alerts:
- **low-pH**: pH is below 7.8
- **high-pH**: pH is above 8.5
- **changing-pH**: pH is increasing or decreasing at >=0.2 pH/hr for >=2 hrs
- **low-DO**: DO is below 4
- **borderline-DO**: DO has been below 5 for >3 hrs

### I/O

Your code should be run from the command line, and the command line interaction and output should match the _format_ illustrated here:

    you@your-computer$ [your command here] pond_data.csv
    4pm: ALERT low-DO
    6pm: ALERT low-pH
    9pm: ALERT low-temperature