# Lessons Learned

## Security Audit Implementation (2024-06-27)

### Context
Multiple security experts audited the braingame project and flagged various security concerns. We systematically addressed the critical issues.

### Key Learnings

#### 1. **Audit Findings vs Reality**
- Many audit findings were **anticipatory warnings** rather than actual vulnerabilities
- Example: "NoSQL injection vulnerability" was flagged, but no database operations existed yet
- **Lesson:** Distinguish between current vulnerabilities and future risks in audit reports

#### 2. **Defensive Programming Pays Off**
- The codebase already followed many best practices (e.g., stack traces were already hidden in production)
- Adding extra layers of defense is still valuable for when the codebase grows
- **Lesson:** Good initial architecture prevents many security issues, but explicit controls are better than implicit ones

#### 3. **Security Through Explicit Configuration**
- Session cookies: Better to explicitly set `httpOnly`, `secure`, and `sameSite` flags than rely on defaults
- Error handling: Explicitly include/exclude stack traces based on environment
- **Lesson:** Make security decisions explicit in code rather than relying on framework defaults

#### 4. **Preventive Security Measures**
- Implemented input sanitization before any database exists
- Created security utilities that will be used when features are added
- **Lesson:** Building security infrastructure early is easier than retrofitting later

#### 5. **Documentation as Security Tool**
- Created comprehensive security guides (SECURITY.md, SESSION_SECURITY.md, ERROR_HANDLING.md)
- Examples show developers the right way to implement features
- **Lesson:** Good documentation prevents security mistakes before they happen

### Technical Insights

1. **Input Validation Strategy**
   - Zod schemas provide type safety AND runtime validation
   - Sanitization should happen at middleware level (defense in depth)
   - MongoDB operator stripping prevents common NoSQL injection patterns

2. **Session Security**
   - In-memory sessions are fine for development but need Redis/MongoDB for production
   - Session regeneration on login is critical for preventing fixation attacks
   - Cookie configuration must be environment-aware (secure flag requires HTTPS)

3. **Error Handling**
   - Correlation IDs (UUIDs) enable debugging without exposing details
   - Database error messages often leak schema information - sanitize them
   - Separate logging strategy from response strategy

### Process Improvements

1. **Audit Review Process**
   - First verify if the vulnerability actually exists
   - Implement preventive measures even if not currently vulnerable
   - Document why and how each issue was addressed

2. **PR Organization**
   - One security issue per PR for easier review
   - Include security context in PR descriptions
   - Add tests that verify the security fix works

3. **Testing Security Features**
   - Unit tests should verify security behavior in different environments
   - Test both positive (feature works) and negative (attack prevented) cases
   - Mock production environment in tests to ensure security features activate

### Future Considerations

1. **Security Checklist for New Features**
   - [ ] Input validation with Zod schemas
   - [ ] Use security utilities for database queries
   - [ ] Check error messages don't leak information
   - [ ] Verify authentication/authorization middleware
   - [ ] Test with NODE_ENV=production

2. **Regular Security Reviews**
   - Audit findings can become outdated quickly
   - Some "non-issues" might become real issues as code evolves
   - Regular review of security documentation keeps it relevant

3. **Security as a Feature**
   - Security improvements are features that deserve PR recognition
   - Preventive security work prevents future incidents
   - Time invested in security infrastructure pays compound interest

## Developer Experience & Build Issues (2025-06-28)

### Context
After completing security fixes, addressed multiple developer experience issues that were blocking builds and hampering productivity.

### Key Learnings

#### 1. **React Native Web Compatibility**
- **Problem:** Components importing React Native packages fail in Next.js builds
- **Solution:** Create `.web.tsx` versions for all components using React Native imports
- **Pattern:** Metro/Next.js automatically resolve platform-specific files
- **Lesson:** Always consider web compatibility when creating shared components

#### 2. **Monorepo Filter Syntax**
- **Problem:** README had incorrect pnpm filter examples (`--filter product` instead of `--filter @braingame/product`)
- **Fix:** Use full package names with @braingame prefix
- **Lesson:** Documentation accuracy is critical for developer experience

#### 3. **Build Dependencies**
- **Problem:** Missing `expo-haptics` blocked product app builds despite being in app.json
- **Fix:** Explicitly add to package.json dependencies
- **Lesson:** Expo plugins must be installed as dependencies, not just configured

#### 4. **Web Build Configuration**
- **Problem:** Next.js couldn't handle .ttf fonts, React Native imports, __DEV__ global
- **Solution:** Configure webpack to:
  - Ignore font files with ignore-loader
  - Alias React Native to react-native-web
  - Define __DEV__ with DefinePlugin
  - Prioritize .web.tsx extensions
- **Lesson:** Web builds need explicit configuration for React Native compatibility

### Technical Implementation Details

1. **Platform-Specific Components**
   ```typescript
   // MyComponent.tsx - React Native version
   import { View, Text } from 'react-native';
   
   // MyComponent.web.tsx - Web version
   import React from 'react';
   // Use div/span instead
   ```

2. **Webpack Configuration Pattern**
   ```typescript
   webpack: (config, { webpack }) => {
     // Handle fonts
     config.module.rules.push({
       test: /\.(ttf|otf|eot|woff|woff2)$/,
       loader: "ignore-loader",
     });
     
     // Platform-specific extensions
     config.resolve.extensions = [".web.tsx", ".web.ts", ...config.resolve.extensions];
     
     // Alias React Native packages
     config.resolve.alias = {
       "react-native$": "react-native-web",
       // ... other aliases
     };
     
     return config;
   }
   ```

3. **Testing Considerations**
   - Use `@testing-library/react` for web components
   - Use `@testing-library/react-native` for React Native components
   - Ensure test imports match the component type

### Process Improvements

1. **Build Verification**
   - Always run `pnpm build` before committing
   - Don't assume CI will catch build issues
   - Test both development and production builds

2. **Documentation Updates**
   - Keep README examples accurate and tested
   - Document platform-specific patterns
   - Update CLAUDE.md with new learnings immediately

3. **Dependency Management**
   - Verify all configured plugins are installed
   - Check for version compatibility
   - Use exact versions for critical dependencies

### Git Hygiene Reminder
- Create separate branches for each type of fix
- Use descriptive branch names (fix/developer-experience-issues)
- Create focused PRs with clear descriptions
- Don't mix unrelated changes in one PR