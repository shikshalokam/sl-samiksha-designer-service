module.exports = {
  async up(db) {
    global.migrationMsg = "Create basic indexes for all collections"

    await db.collection('draftQuestions').createIndex({ userId: 1 }, { background: 1 })
    await db.collection('draftQuestions').createIndex({ draftCriteriaId: 1 }, { background: 1 })
    await db.collection('draftQuestions').createIndex({ draftFrameworkId: 1 }, { background: 1 })
    await db.collection('draftQuestions').createIndex({ draftEvidenceMethodId: 1 }, { background: 1 })
    await db.collection('draftQuestions').createIndex({ draftSectionId: 1 }, { background: 1 })

    await db.collection('draftECM').createIndex({ draftFrameworkId: 1 }, { background: 1 })
    await db.collection('draftECM').createIndex({ userId: 1 }, { background: 1 })

    await db.collection('draftSections').createIndex({ draftFrameworkId: 1 }, { background: 1 })
    await db.collection('draftSections').createIndex({ userId: 1 }, { background: 1 })

    await db.collection('draftCriteria').createIndex({ userId: 1 }, { background: 1 })


    return
    // return await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db) {
    // return await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
