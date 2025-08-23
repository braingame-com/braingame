You are tasked with reviewing all the documentation in a project and ensuring it accurately reflects the reality of the project or, where applicable, the intended vision of the project. This is a crucial task for maintaining project integrity, facilitating team communication, and ensuring smooth onboarding of new team members.

Here is the project documentation:

<project_documentation>
{{PROJECT_DOCUMENTATION}}
</project_documentation>

And here is the project codebase:

<project_codebase>
{{PROJECT_CODEBASE}}
</project_codebase>

Please follow these steps to review the documentation:

1. Carefully read through all the project documentation.

2. Examine the project codebase, paying close attention to:
   - File structure
   - Function and class names
   - Comments within the code
   - Implementation details

3. Compare the documentation with the actual codebase, looking for:
   - Inconsistencies between documented features and implemented features
   - Outdated information in the documentation
   - Missing documentation for existing features
   - Documented features that are not implemented in the code

4. For each discrepancy you find, note:
   - The specific location in the documentation
   - The corresponding location in the codebase (if applicable)
   - A brief description of the discrepancy
   - Whether it appears to be an issue with the documentation or the code

5. Where the documentation doesn't match the code, try to determine if this is because:
   - The documentation is outdated and needs to be updated to reflect the current code
   - The code has deviated from the intended vision of the project as described in the documentation
   - There's a bug or unfinished implementation in the code

6. For each issue identified, suggest an improvement. This could be:
   - Updating the documentation to accurately reflect the code
   - Modifying the code to align with the documented intended vision
   - Adding missing documentation for undocumented features

7. Present your findings in the following format:

<findings>
<issue>
<location_in_doc>[Specific location in documentation]</location_in_doc>
<location_in_code>[Corresponding location in code, if applicable]</location_in_code>
<description>[Brief description of the discrepancy]</description>
<type>[Documentation issue / Code issue / Vision mismatch]</type>
<suggestion>[Proposed improvement]</suggestion>
</issue>
[Repeat for each issue found]
</findings>

8. After listing all issues, provide a summary of your review, including:
   - The overall state of the documentation
   - Major areas that need improvement
   - Any patterns or systemic issues you noticed

Present your summary in the following format:

<summary>
<overall_state>[Brief description of the overall state of documentation]</overall_state>
<major_areas>[List of major areas needing improvement]</major_areas>
<patterns>[Any patterns or systemic issues noticed]</patterns>
</summary>

Your final output should consist of only the <findings> and <summary> sections. Do not include any additional commentary or repeat the instructions.