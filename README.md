# CSV Analyser

This program is a client-side CSV Analyser. It allows a user to upload one CSV file at a time. The uploaded CSV file will be analysed and the information of each file will be displayed as its own table. Once the analysis is displayed, the information will persist even if the user refreshes or closes the page. The user can also delete any of the files' analysis data.

## How to run this program

This program was created with `pnpm`, so it is recommended to run this program with pnpm. If you do not have pnpm installed on your machine, you do so with:

```
npm install -g pnpm
```

Then, install the dependencies and run the program with

```
pnpm install
pnpm dev
```

Alternatively, if you prefer to use `npm` or `yarn`, you may install and run the program as normal, but issues may occur due to the pnpm-lock.yaml.

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

## Assumptions

1. All CSV files used with this program must have a header row followed by data rows. Information that is not part of the tabular data should not be included in the CSV file.
2. The data types that can be recognised by the program are string (text), numbers and booleans. Dates are considered to be strings.
3. All data in the same column will have the same type.
