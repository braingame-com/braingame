import { validateEmail, sanitizeEmail } from '../emailService';

describe('emailService', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'first+last@subdomain.example.org',
        'test123@test-domain.com',
        'a@b.co',
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        '',
        'invalid',
        '@domain.com',
        'user@',
        'user..name@domain.com',
        'user@domain.',
        'user name@domain.com',
        'user@domain@domain.com',
      ];

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });

  describe('sanitizeEmail', () => {
    it('should trim whitespace and convert to lowercase', () => {
      expect(sanitizeEmail('  Test@Example.COM  ')).toBe('test@example.com');
      expect(sanitizeEmail('USER@DOMAIN.ORG')).toBe('user@domain.org');
      expect(sanitizeEmail('  mixed@Case.email  ')).toBe('mixed@case.email');
    });

    it('should handle already clean emails', () => {
      expect(sanitizeEmail('clean@email.com')).toBe('clean@email.com');
    });
  });
});