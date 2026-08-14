// Shared hierarchy data for the How It Works divergences.
window.HIERARCHY = {
  order: ['onboarding', 'home', 'cases', 'profile'],
  workflows: {
    onboarding: [['screen', 'screen-welcome'], ['screen', 'screen-account_setup'], ['screen', 'screen-ticket_upload']],
    home: [['screen', 'screen-home_dashboard'], ['component', 'component-case_summary_card']],
    cases: [['system', 'system-case_status_and_action'], ['component', 'component-case_preview_cards'], ['screen', 'screen-all_cases_feed'], ['screen', 'screen-single_case_details']],
    profile: [['screen', 'screen-account_settings'], ['component', 'component-payment_methods']],
  },
  insides: [
    ['canonical_board.html', 'the current proposal', true],
    ['kits/', 'frozen source', false],
    ['explorations/', 'divergences in flight', false],
    ['archive/', 'closed work', false],
    ['ledger.md', 'decisions index', false],
  ],
};
