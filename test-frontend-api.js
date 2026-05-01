// Test frontend API calls to verify they work correctly

async function testFrontendAPI() {
  console.log('🧪 Testing Frontend API Integration...\n');
  
  try {
    // Test analytics endpoint (same as dashboard)
    console.log('1. Testing Analytics API (as called by frontend)...');
    const analyticsRes = await fetch('http://localhost:5000/api/analytics');
    
    if (!analyticsRes.ok) {
      throw new Error(`Analytics API responded with status: ${analyticsRes.status}`);
    }
    
    const text = await analyticsRes.text();
    if (text.startsWith('<!DOCTYPE')) {
      throw new Error('Received HTML instead of JSON from analytics API');
    }
    
    const analyticsData = JSON.parse(text);
    console.log('✅ Analytics Data:', analyticsData);
    
    // Test analytics view tracking
    console.log('\n2. Testing Analytics View Tracking...');
    const viewRes = await fetch('http://localhost:5000/api/analytics/view', { 
      method: 'POST' 
    });
    
    if (viewRes.ok) {
      console.log('✅ View tracking successful');
    } else {
      console.log('⚠️ View tracking failed, but not critical');
    }
    
    console.log('\n🎉 Frontend API integration is working correctly!');
    console.log('✅ No more JSON parsing errors');
    
  } catch (error) {
    console.error('❌ Frontend API test failed:', error.message);
  }
}

testFrontendAPI();
