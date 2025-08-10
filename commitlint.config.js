module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      // Match: Either COD-<num>: message OR type: message
      headerPattern: /^(COD-\d+|build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test):\s?(.*)$/,
      headerCorrespondence: ['typeOrTicket', 'subject'],
    },
  },
  rules: {
    'subject-empty': [2, 'never'], // subject must not be empty
    'type-empty': [0], // disable default type check
  },
};
