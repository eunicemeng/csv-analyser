<!-- @format -->

# react-client-side-analyzer

## Introduction

You are building a Proof of Concept (POC) to demonstrate how processing and data management can be handled entirely on the **client-side** to ensure data residency (i.e., data does not leave the client machine).

## User Stories

### User Story 1: CSV File Processing and Analysis

**As a** user, **I want** to upload a CSV file and generate an analysis output, **so that** I can understand the data contained in the file.

#### Acceptance Criteria:

1. **Given** a CSV file, **when** I upload it, **then** the system should process the file and generate an analysis output.
2. **The analysis output must include**:
   - Data Source (i.e., filename)
   - Column names
   - Data type for each column
   - Number of empty values in each column
   - Mean and standard deviation for numeric columns
   - Top 5 values by count for non-numeric columns
3. **The UI should remain responsive when the CSV is been processed**
4. **All processing MUST be done on the client-side (browser)** - no data should leave the client machine, and no APIs should be called (including backend services hosted locally).

> NOTE You do not need to implement the entire CSV parsing or statistical computation from scratch - i.e. you are allowed to use external libraries
> to complement your solution.

---

### User Story 2: UI Widget for Displaying Analysis Results

**As a** user, **I want** a UI widget to display the analysis results, **so that** I can review the data analysis.

#### Acceptance Criteria:

1. **Given** an analysis result, **when** I view the UI, **then** there should be a widget displaying the analysis results.
2. **Given** an analysis result, **when** I decide it's unwanted or has failed, **then** I should be able to delete it from the UI widget.

---

### User Story 3: Persisting Analysis Results

**As a** user, **I want** the analysis results to be saved in local storage, **so that** I can access the results even after closing the browser.

#### Acceptance Criteria:

1. **Given** an analysis result, **when** I close the tab and reopen it, **then** the system should display the previously generated analysis results from local storage.

---

### User Story 4: Responsive Design

**As a** user, **I want** the application to be responsive, **so that** it provides an optimal viewing experience on different screen sizes, including tablets (768px) and large desktops (>1280px).

#### Acceptance Criteria:

1. **Given** a screen size of 768px, **when** I view the application, **then** the layout should adjust to provide a user-friendly interface suitable for tablets.
2. **Given** a screen size greater than 1280px, **when** I view the application, **then** the layout should adjust to utilize the available screen space effectively for large desktops.
