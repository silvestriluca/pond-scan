# Osmo Systems Homework Problem
Note: *Please do not share the nature or details of this problem with anyone. We'd like it to be fresh for new applicants!*

Applicant!

Welcome and thank you for considering Osmo.

At Osmo Systems, our focus is on monitoring water quality in fish farms, and providing key data to farmers in order to increase efficiency and avoid catastrophic collapse.

Your mission, should you choose to accept it, is to write code to analyze water quality measurements and provide *alerts* based on those measurements. The specifics of this task are detailed below. **Read carefully, feel free to ask questions, and have fun!**

Please use a modern language, e.g. python, ruby, javascript/node. Within that constraint, use the language that you're most comfortable with for solving this problem.

Spend no more than 4 hours on this problem. It’s OK if you’re not 100% done during that time; just turn in what you have!

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

## What we're looking for

As you are completing this problem, keep in mind that we’d like to see you to demonstrate:
 - Ability to turn a spec into well-built, reliable, readable, maintainable code
 - Familiarity with your choice of language
 - Attention to detail
 - Problem-solving
 - Possibly a little bit of **flair** ;)


## What's next?

Please send your solution to us as a .zip package. One of our devs will then run and evaluate your code.

If you're invited to the next stage in our hiring process, we will expand on your code during a pairing exercise that introduces new requirements.


## Questions?

If there's something you don't understand, or think should be different, don't hesitate to drop us a line!
