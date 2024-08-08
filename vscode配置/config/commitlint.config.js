module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // �¹��� feature
        'fix', // �޸� bug
        'docs', // �ĵ�ע��
        'style', // �����ʽ
        'refactor', // �ع�
        'perf', // �����Ż�
        'test', // ���Ӳ���
        'chore', // �������̻������ߵı䶯
        'revert', // ����
        'build' // ���
      ]
    ],
    'subject-case': [0]
  }
};
