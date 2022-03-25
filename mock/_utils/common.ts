export function opUser(): any {
  // 2021-06-13T10:23:37.246
  return {
    creator: '@id',
    creatorName: '@cname',
    createdAt: datetime(),
    lastUpdater: '@id',
    lastUpdaterName: '@cname',
    lastUpdatedAt: datetime(),
  };
}

export function encoding(length: number = 5): string {
  return `@string(${length})`;
}

export function zhCN(min: number = 3, max: number = 6): string {
  return `@cword(${min}, ${max})`;
}

export function datetime() {
  return '@date()T@time().246';
}

export function amt() {
  return '@float(0, 10000, 2, 2)';
}
