const accounts = [
  { account_id: 'chat1111', password: 'chat1111!' },
  { account_id: 'chat2222', password: 'chat2222!' },
  // 필요하면 계속 추가
];

export default async function getTokenForAccount({ account_id, password }) {
  try {
    const res = await fetch('http://43.201.70.73/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account_id, password }),
    });

    // 실패 응답 디버그 도움
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { error: `HTTP ${res.status}`, detail: err };
    }

    const data = await res.json();
    // { refresh, access }
    return { access: data.access, refresh: data.refresh };
  } catch (e) {
    return { error: e.message };
  }
};

Promise.all(accounts.map(getTokenForAccount))
  .then((results) => {
    console.log('=== 토큰 발급 결과 ===');
    results.forEach((result) => {
      if (result.error) {
        console.error(`❌ ${result.account_id}: ${result.error}`);
      } else {
        console.log(`✅ ${result.account_id}`);
        console.log(`   Access: ${result.access}`);
        console.log(`   Refresh: ${result.refresh}`);
      }
    });
  });