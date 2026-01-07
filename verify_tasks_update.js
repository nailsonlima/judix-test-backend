
// import fetch from 'node-fetch';
// Actually, since type: module is set, we can use top level await.
// But better to wrap in main function.

// Since I'm not sure if node-fetch is installed (it's not in package.json), I'll rely on global fetch.
// If global fetch isn't there, this will fail, and I'll have to use http module.
// But node 18+ is standard.

const BASE_URL = 'http://localhost:3001/api';

async function runTest() {
  console.log('Starting verification...');

  // 1. Register User
  const randomId = Math.floor(Math.random() * 10000);
  const user = {
    name: `Test User ${randomId}`,
    email: `test${randomId}@example.com`,
    password: 'password123'
  };

  console.log('Registering user:', user.email);
  const registerRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

  const registerData = await registerRes.json();
  if (registerData.status !== 'success') {
    console.error('Registration failed:', registerData);
    process.exit(1);
  }
  
  const token = registerData.data.token;
  console.log('User registered. Token acquired.');

  // 2. Create Tasks
  const tasksToCreate = [
    { title: 'Task A', description: 'Desc A', completed: true }, // Not directly supported by create endpoint usually, check implementation
    // Wait, createTask just takes title and description. Completed is default false.
    // I need to update it afterwards or just create then update?
    // Let's check createTask... it only takes title, description. Default completed is false.
    // So I need to create then update Task A to completed=true.
    { title: 'Task B', description: 'Desc B' },
    { title: 'Searchable Task', description: 'Desc C' }
  ];

  console.log('Creating tasks...');
  for (const t of tasksToCreate) {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: t.title, description: t.description })
    });
    const data = await res.json();
    t.id = data.data._id; // Save ID
    
    if (t.completed) {
      // Update to completed
      await fetch(`${BASE_URL}/tasks/${t.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: true })
      });
    }
  }
  console.log('Tasks created.');

  // 3. Test Cases

  // Case 1: All tasks
  const res1 = await fetch(`${BASE_URL}/tasks`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data1 = await res1.json();
  console.log(`\nTest 1 (All tasks): Found ${data1.data.length} tasks. Expected 3.`);
  if (data1.data.length !== 3) console.error('FAIL'); else console.log('PASS');

  // Case 2: Search "Searchable"
  const res2 = await fetch(`${BASE_URL}/tasks?search=Searchable`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data2 = await res2.json();
  console.log(`Test 2 (Search 'Searchable'): Found ${data2.data.length} tasks. Expected 1.`);
  if (data2.data.length !== 1 || data2.data[0].title !== 'Searchable Task') console.error('FAIL'); else console.log('PASS');

  // Case 3: Filter completed=true
  const res3 = await fetch(`${BASE_URL}/tasks?completed=true`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data3 = await res3.json();
  console.log(`Test 3 (Filter completed=true): Found ${data3.data.length} tasks. Expected 1.`);
  if (data3.data.length !== 1 || data3.data[0].title !== 'Task A') console.error('FAIL'); else console.log('PASS');

  // Case 4: Search "Task" AND completed=false
  const res4 = await fetch(`${BASE_URL}/tasks?search=Task&completed=false`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data4 = await res4.json();
  // "Task A" (completed), "Task B" (incomplete), "Searchable Task" (incomplete)
  // "Task" regex matches all three.
  // completed=false matches Task B and Searchable Task.
  console.log(`Test 4 (Search 'Task' & completed=false): Found ${data4.data.length} tasks. Expected 2.`);
  const titles = data4.data.map(t => t.title).sort();
  if (data4.data.length !== 2) console.error('FAIL');
  else if (!titles.includes('Task B') || !titles.includes('Searchable Task')) console.error('FAIL', titles);
  else console.log('PASS');

}

runTest().catch(console.error);
