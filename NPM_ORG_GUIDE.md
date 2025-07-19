# 🏢 How to Create NPM Organization & Publish Scoped Packages

## Organization Name Ideas

Choose a unique organization name that represents you or your project:

### Personal/Developer Organizations
- `@your-name-dev` (e.g., `@john-smith-dev`)
- `@your-name-labs` (e.g., `@sarah-labs`)
- `@your-name-tools` (e.g., `@mike-tools`)

### Project/Company Organizations
- `@flowcsolutions`
- `@react-formtools`
- `@ui-components-pro`
- `@webform-solutions`

### Current Package Name
I've updated your package to: `@flowcsolutions/react-form-builder`

## Step-by-Step Setup

### 1. Create NPM Account
```bash
# If you don't have an account yet
npm adduser
# OR login if you already have one
npm login
```

### 2. Create Organization

#### Option A: Via NPM Website (Easiest)
1. Go to [npmjs.com](https://npmjs.com)
2. Login to your account
3. Click your profile picture → "Add Organization"
4. Enter organization name: `formbuilder-dev`
5. Choose "Unlimited public packages (free)"
6. Click "Create Organization"

#### Option B: Via Command Line
```bash
npm org create formbuilder-dev
```

### 3. Verify Organization
```bash
npm org ls formbuilder-dev
```

### 4. Publish Your Package

#### First, build the library:
```bash
npm run build:lib
```

#### Then publish (first time):
```bash
npm publish --access public
```

#### For updates:
```bash
npm version patch  # or minor/major
npm publish
```

## Alternative: No Organization (Unscoped Package)

If you prefer not to use an organization, you can publish without the `@org/` prefix:

```json
{
  "name": "react-awesome-form-builder",
  "name": "modern-react-form-builder", 
  "name": "heroui-form-builder"
}
```

But you'll need to find an available name (most good names are taken).

## Package Name Suggestions

### With Organization (Recommended)
- `@flowcsolutions/react-form-builder` ✅ (current)
- `@react-tools/form-builder`
- `@ui-kits/form-builder`
- `@your-name/react-form-builder`

### Without Organization (if available)
- `react-heroui-form-builder`
- `modern-form-builder-react`
- `tailwind-form-builder`
- `heroui-form-creator`

## Publishing Commands

### Initial Setup
```bash
# 1. Login to NPM
npm login

# 2. Build the package
npm run build:lib

# 3. Test the package locally
npm pack
# This creates a .tgz file you can test in other projects

# 4. Publish (first time)
npm publish --access public

# 5. Success! Your package is now available:
npm install @flowcsolutions/react-form-builder
```

### Future Updates
```bash
# Update version and publish
npm version patch    # 1.0.0 → 1.0.1
npm version minor    # 1.0.0 → 1.1.0  
npm version major    # 1.0.0 → 2.0.0

npm publish
```

## Organization Benefits

### ✅ Advantages of Using Organization
- **Namespace Control**: Own all packages under `@yourorg/`
- **Professional Look**: Looks more official
- **Team Collaboration**: Add team members to organization
- **Package Discovery**: Users find related packages easily
- **Name Availability**: Less naming conflicts

### Example Usage After Publishing
```bash
# Users can install your package:
npm install @flowcsolutions/react-form-builder

# In their React app:
import { FormBuilderSuite } from '@flowcsolutions/react-form-builder';
import '@flowcsolutions/react-form-builder/styles';
```

## Organization Management

### Add Team Members
```bash
npm org set formbuilder-dev your-teammate-username developer
```

### View Organization
```bash
npm org ls formbuilder-dev
```

### Organization Roles
- **Owner**: Full control
- **Admin**: Manage packages and members  
- **Developer**: Publish packages
- **Billing**: Manage billing only

## Cost

- **Public Packages**: FREE for unlimited public packages
- **Private Packages**: Paid plans if you need private packages
- **Team Features**: Advanced collaboration features available in paid plans

## Example: Complete Publishing Flow

```bash
# 1. Create organization on npmjs.com
# Organization name: formbuilder-dev

# 2. Login to NPM
npm login

# 3. Verify you're logged in
npm whoami

# 4. Build your package
npm run build:lib

# 5. Test locally (optional)
npm pack
# Test the .tgz file in another project

# 6. Publish
npm publish --access public

# 7. Verify it worked
npm view @flowcsolutions/react-form-builder

# 8. Success! Share your package:
echo "Install: npm install @flowcsolutions/react-form-builder"
```

## Your Package URL After Publishing

- **NPM Page**: https://www.npmjs.com/package/@flowcsolutions/react-form-builder
- **Install Command**: `npm install @flowcsolutions/react-form-builder`
- **Organization Page**: https://www.npmjs.com/org/flowcsolutions

Start with `flowcsolutions` as your organization name, or choose something that represents you better!
