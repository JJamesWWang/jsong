export function postUsername(username: string) {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: username }), 500)
  );
}
