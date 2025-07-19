# Contributing to React Form Builder

Thank you for your interest in contributing to React Form Builder! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js (18 or higher)
- npm or yarn
- Git

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/yourusername/react-form-builder.git
cd react-form-builder
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code formatting (Prettier configuration)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Follow React best practices and hooks guidelines

### Component Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React contexts
├── data/               # Static data and configurations
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── examples/           # Example implementations
└── docs/               # Documentation files
```

### Adding New Field Types

1. Define the field type in `src/types/form.ts`
2. Add the field configuration to `src/data/formFields.ts`
3. Implement rendering logic in `src/components/FormFieldRenderer.tsx`
4. Add the field to the appropriate category in `FIELD_CATEGORIES`
5. Update tests and documentation

### Testing

- Write unit tests for new utility functions
- Test components with different props and states
- Ensure mobile responsiveness
- Test form export/import functionality

## 🐛 Bug Reports

When filing a bug report, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, Node version
- **Screenshots**: If applicable

## 💡 Feature Requests

For new features:

- Check existing issues to avoid duplicates
- Describe the use case and motivation
- Provide mockups or examples if applicable
- Consider implementation complexity

## 🔄 Pull Request Process

1. **Create a branch**: `git checkout -b feature/your-feature-name`
2. **Make changes**: Implement your feature or fix
3. **Test thoroughly**: Ensure everything works
4. **Update documentation**: Add/update relevant docs
5. **Commit**: Use clear, descriptive commit messages
6. **Push**: `git push origin feature/your-feature-name`
7. **Create PR**: Submit a pull request with detailed description

### PR Requirements

- [ ] Code follows project style guidelines
- [ ] New code has appropriate tests
- [ ] Documentation is updated
- [ ] No breaking changes (or clearly documented)
- [ ] Build passes successfully
- [ ] Screenshots for UI changes

## 📚 Documentation

- Keep README.md up to date
- Document new features in appropriate docs files
- Use clear examples in code comments
- Update API documentation for component changes

## 🏷️ Release Process

Releases follow semantic versioning:

- **Major (1.0.0)**: Breaking changes
- **Minor (0.1.0)**: New features, backward compatible
- **Patch (0.0.1)**: Bug fixes, backward compatible

## 💬 Community

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Provide constructive feedback

## 📞 Getting Help

- Check the documentation first
- Search existing issues
- Ask questions in GitHub Discussions
- Tag maintainers if needed

## 🙏 Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes for significant contributions
- GitHub contributors page

Thank you for contributing to React Form Builder! 🎉
