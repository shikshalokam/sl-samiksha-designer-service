module.exports = {
  async up(db) {
    global.migrationMsg = "Create basic indexes for all collections"

    await db.collection('questions').createIndex( { criteriaId: 1 }, { background : 1} )
    await db.collection('questions').createIndex( { frameworkId: 1 }, { background : 1} )
    await db.collection('questions').createIndex( { evidenceMethod: 1 }, { background : 1} )
    await db.collection('draftECM').createIndex( { frameworkId: 1 }, { background : 1} )
    await db.collection('draftSections').createIndex( { frameworkId: 1 }, { background : 1} )
    
    return 
    // return await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db) {
    // return await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
