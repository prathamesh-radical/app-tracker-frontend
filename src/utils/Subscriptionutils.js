const parseSubscriptionDate = (date) => {
    if (!date) return null;

    const value = String(date).trim();

    // ISO date with timezone
    if (value.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(value)) {
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    // DB format: YYYY-MM-DD HH:mm:ss
    const normalized = value.includes(' ')
        ? value.replace(' ', 'T')
        : value;

    const parsed = new Date(`${normalized}Z`);

    return Number.isNaN(parsed.getTime()) ? null : parsed;
};


export const getSubscriptionStatus = (item) => {
    const now = new Date();

    const trialStartedAt = parseSubscriptionDate(
        item?.trial_started_at
    );

    const subscriptionStartDate = parseSubscriptionDate(
        item?.subscription_start_date
    );

    const subscriptionExpiryDate = parseSubscriptionDate(
        item?.subscription_expiry_date
    );

    /*
     * No valid subscription expiry date
     */
    if (!subscriptionExpiryDate) {
        return 'Free';
    }

    /*
     * 1. EXPIRED
     *
     * Expiry date has already passed.
     */
    if (subscriptionExpiryDate < now) {
        return 'Expired';
    }

    /*
     * 2. TRIAL
     *
     * trial_started_at and subscription_start_date
     * are the same date/time, meaning this record
     * represents the trial period.
     *
     * Example:
     * trial_started_at        = 2026-08-22 04:08:11
     * subscription_start_date = 2026-08-22 04:08:11
     * subscription_expiry_date = 2026-08-29 04:08:11
     */
    const isTrialPeriod =
        trialStartedAt &&
        subscriptionStartDate &&
        trialStartedAt.getTime() === subscriptionStartDate.getTime() &&
        trialStartedAt <= now &&
        now <= subscriptionExpiryDate;

    if (isTrialPeriod) {
        return 'Trial';
    }

    /*
     * 3. ACTIVE PREMIUM
     *
     * Paid subscription is currently active.
     */
    const isPremiumActive =
        subscriptionStartDate &&
        subscriptionStartDate <= now &&
        now <= subscriptionExpiryDate;

    if (isPremiumActive) {
        return 'Active';
    }

    /*
     * No currently active subscription.
     */
    return 'Free';
};