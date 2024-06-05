# RAL Contrast Checker

This is a tool for checking the contrast between two RAL colors.

## Overview

This tool checks the contrast of RAL colors. It is useful for designers who want to ensure that the colors they choose have sufficient contrast for accessibility purposes. The tool takes two RAL color codes as input and calculates the contrast ratio between them. It is designed as a React component written in Typescript. It can be installed on a website and used as a component within the website. The application is designed and developed to be accessible according to the WCAG 2.1 guidelines.

## Features

This tool has the following features:

-   Support for more than 180 RAL color codes
-   Calculation of contrast ratio based on WCAG 2.0 guidelines
-   Pass/fail result based on WCAG 2.0 guidelines

## Installation

To use this tool, you will need to have Node.js installed on your system. Once you have Node.js installed, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Change directory to the frontend folder with: `cd frontend`
4. Run `npm install` to install the project dependencies.
5. Run `npm run dev` to start the tool.

That's it! The tool should now be running, and you can begin checking the contrast of RAL colors.

## How to use

To use the tool, follow these steps:

1. Enter the primary RAL color code into the corresponding input field.
2. Enter the secondary RAL color into the corresponding input field.
3. The tool will output a bad, good or alarming result directly.

-   Bad result: Results of colors where the contrast is lower than 0.3. This color combination should be avoided.
-   Good result: Result of colors where the contrast is 0.3 or above and lower than 0.7. This is a color combination that can be used.
-   Alarming result: Result of colors where the contrast is 0.7 or above. This color combination should only be used with objects that need to be eye-catching.

## Support

The RAL Contrast Checker is designed to provide designers with a quick and easy way to check the contrast of their chosen RAL color combinations. However, it is important to note that this tool is only a starting point for designers and should not be relied upon for a detailed analysis of the contrast of colors.

For a more comprehensive analysis, we recommend consulting with an accessibility expert or conducting further testing using specialized tools. These experts have a deeper understanding of the various factors that affect color contrast and can provide guidance on how to optimize it.

## Future development

This application was designed and developed with future expandability and transferability in mind. If you have any suggestions for features or improvements, please feel free to open a pull request or submit an issue on GitHub.

### Could-Have's

The "Could-Have's" section lists some features that the RAL Contrast Checker application could potentially include in the future. One possible feature could be an extensive chart that provides more detailed information and an assessment of the contrast between the two RAL colors. This chart could potentially include additional metrics such as luminance, hue, saturation, and other color properties. By providing more detailed information, designers can better evaluate the contrast and make informed decisions about color choices.

Another potential feature for the application is to suggest other appropriate colors that would complement the existing color scheme. For example, the application could provide a list of recommended colors that have similar properties to the input RAL color codes, but with a higher contrast ratio. This would allow designers to explore alternative color options that meet accessibility requirements while still fitting within their overall design aesthetic.

Overall, these additional features would help make the RAL Contrast Checker application more robust and useful for designers. By providing more detailed information and suggestions, the application can help designers make informed decisions about color choices that meet accessibility guidelines without sacrificing their overall design vision.

## Contributors

-   [Kerem](https://github.com/kerem748)
-   [Jan](https://github.com/JtdeGraaf)
-   [Ryan](https://github.com/Ryan-Reddy)
-   [Hind](https://github.com/hindbaroudii)
-   [Mehmet](https://github.com/kilimanjaro030)

## Credits and Acknowledgements

This tool was developed for the [Accessibility Foundation](https://www.accessibility.nl/) by students of the [University of Applied Sciences Utrecht](https://www.internationalhu.com/). We would like to thank the nice people of the [Accessibility Foundation](https://www.accessibility.nl/) for their work and guidance. We would also like to thank our tutor, [Roelant](https://github.com/roelanto) for his valuable guidance and help.

Finally, thank you to everyone who contributed to this project in any way!
