# Monetisation & Growth Audit

Generated: 24-06-2025

## Findings

- **Conversion Funnel**
  - Payment modal simulates payment processing without real integration.
  - Premium screen offers annual and monthly plans with a 7‑day trial.
  - Analytics events (`purchase_start`, `subscription_start`) exist but providers are commented out.
- **Pricing & Upsell Flow**
  - Clear annual and monthly pricing, but no dynamic pricing or localization.
  - Trial messaging present; upsell copy could highlight benefits earlier in the flow.
- **Referral & Social**
  - No referral or invite mechanism in the codebase.
  - Login supports Apple and Google sign‑in but social sharing feature flags are disabled.
- **Retention & Habit Loops**
  - Analytics tracks engagement events (e.g., `mindset_start`, `goal_complete`).
  - Navigation guard checks subscription status to gate premium features.
- **Experiments & Growth Tooling**
  - Feature flags defined in `env.ts`; LaunchDarkly wrapper planned but not implemented.
  - TODO list calls for Mixpanel/Amplitude integration.

## Drop‑off Map (Hypothetical)

1. **Onboarding → Premium Screen**
   - Potential dropout if analytics is disabled; no event data collected.
2. **Premium Screen → Payment Modal**
   - Users may exit due to limited payment options or unclear value proposition.
3. **Payment Processing → Subscription Active**
   - Simulation suggests real payment flow is incomplete; dropout likely here.

## Hypotheses

1. Integrating real analytics (Mixpanel/Amplitude) will reveal precise funnel dropoffs.
2. Adding a referral program could lower acquisition costs and drive viral loops.
3. Implementing A/B tests for pricing copy might increase trial conversions.
4. Enabling social sharing features could boost retention through community challenges.

## Activation Roadmap

1. **Integrate Analytics Providers**
   - Implement Mixpanel or Amplitude via `AnalyticsService` providers.
   - Capture subscription events and funnel metrics.
2. **Build Referral System**
   - Add unique invite codes and reward structure.
   - Track referrals in analytics for ROI measurement.
3. **Feature Flags & Experiments**
   - Add LaunchDarkly wrapper and create A/B experiments (pricing, onboarding copy).
4. **Iterate Upsell Flow**
   - Test short videos or testimonials on the Premium screen.
   - Offer limited‑time discounts or bundles.
5. **Growth Dashboards**
   - Create dashboards aggregating subscription, referral, and retention metrics.

