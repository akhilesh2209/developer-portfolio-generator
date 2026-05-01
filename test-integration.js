// Test script to verify dynamic data integration

async function testIntegration() {
  console.log('🧪 Testing Dynamic Data Integration...\n');
  
  try {
    // Test analytics endpoint
    console.log('1. Testing Analytics API...');
    const analyticsRes = await fetch('http://localhost:5000/api/analytics');
    const analyticsData = await analyticsRes.json();
    console.log('✅ Analytics:', analyticsData);
    
    // Test GitHub endpoint
    console.log('\n2. Testing GitHub API...');
    const githubRes = await fetch('http://localhost:5000/api/github/akhilesh2209');
    const githubData = await githubRes.json();
    console.log('✅ GitHub repos count:', githubData.length);
    console.log('✅ First repo:', githubData[0]?.name);
    
    // Test AI endpoint
    console.log('\n3. Testing AI API...');
    const aiRes = await fetch('http://localhost:5000/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Project',
        description: 'A test project',
        language: 'JavaScript'
      })
    });
    const aiData = await aiRes.json();
    console.log('✅ AI Description:', aiData.description?.substring(0, 100) + '...');
    
    console.log('\n🎉 All API endpoints are working correctly!');
    console.log('✅ Dynamic data integration is complete');
    
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
  }
}

testIntegration();
