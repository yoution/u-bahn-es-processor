/**
 * This module contains es resources configuration.
 */

const config = require('config')
const { validProperties } = require('./helper')

const topResources = {
  achievementprovider: {
    index: config.get('ES.ACHIEVEMENT_PROVIDER_INDEX'),
    type: config.get('ES.ACHIEVEMENT_PROVIDER_TYPE'),
    enrich: {
      policyName: config.get('ES.ENRICHMENT.achievementprovider.enrichPolicyName'),
      matchField: 'id',
      enrichFields: ['id', 'name', 'created', 'updated', 'createdBy', 'updatedBy']
    }
  },
  attribute: {
    index: config.get('ES.ATTRIBUTE_INDEX'),
    type: config.get('ES.ATTRIBUTE_TYPE'),
    enrich: {
      policyName: config.get('ES.ENRICHMENT.attribute.enrichPolicyName'),
      matchField: 'id',
      enrichFields: ['id', 'name', 'attributeGroupId', 'created', 'updated', 'createdBy', 'updatedBy', 'attributegroup']
    },
    ingest: {
      pipeline: {
        id: config.get('ES.ENRICHMENT.attributegroup.pipelineId')
      }
    }
  },
  attributegroup: {
    index: config.get('ES.ATTRIBUTE_GROUP_INDEX'),
    type: config.get('ES.ATTRIBUTE_GROUP_TYPE'),
    enrich: {
      policyName: config.get('ES.ENRICHMENT.attributegroup.enrichPolicyName'),
      matchField: 'id',
      enrichFields: ['id', 'name', 'organizationId', 'created', 'updated', 'createdBy', 'updatedBy']
    },
    pipeline: {
      id: config.get('ES.ENRICHMENT.attributegroup.pipelineId'),
      field: 'attributeGroupId',
      targetField: 'attributegroup',
      maxMatches: '1'
    }
  },
  organization: {
    index: config.get('ES.ORGANIZATION_INDEX'),
    type: config.get('ES.ORGANIZATION_TYPE')
  },
  role: {
    index: config.get('ES.ROLE_INDEX'),
    type: config.get('ES.ROLE_TYPE'),
    enrich: {
      policyName: config.get('ES.ENRICHMENT.role.enrichPolicyName'),
      matchField: 'id',
      enrichFields: ['id', 'name', 'created', 'updated', 'createdBy', 'updatedBy']
    }
  },
  skill: {
    index: config.get('ES.SKILL_INDEX'),
    type: config.get('ES.SKILL_TYPE'),
    enrich: {
      policyName: config.get('ES.ENRICHMENT.skill.enrichPolicyName'),
      matchField: 'id',
      enrichFields: ['id', 'skillProviderId', 'name', 'externalId', 'uri', 'created', 'updated', 'createdBy', 'updatedBy', 'skillprovider']
    },
    ingest: {
      pipeline: {
        id: config.get('ES.ENRICHMENT.skillprovider.pipelineId')
      }
    }
  },
  skillprovider: {
    index: config.get('ES.SKILL_PROVIDER_INDEX'),
    type: config.get('ES.SKILL_PROVIDER_TYPE'),
    enrich: {
      policyName: config.get('ES.ENRICHMENT.skillprovider.enrichPolicyName'),
      matchField: 'id',
      enrichFields: ['id', 'name', 'created', 'updated', 'createdBy', 'updatedBy']
    },
    pipeline: {
      id: config.get('ES.ENRICHMENT.skillprovider.pipelineId'),
      field: 'skillProviderId',
      targetField: 'skillprovider',
      maxMatches: '1'
    }
  }
}

const userResources = {
  achievement: {
    propertyName: config.get('ES.USER_ACHIEVEMENT_PROPERTY_NAME'),
    relateKey: 'achievementsProviderId',
    validate: payload => validProperties(payload, ['userId', 'achievementsProviderId'])
  },
  externalprofile: {
    propertyName: config.get('ES.USER_EXTERNALPROFILE_PROPERTY_NAME'),
    relateKey: 'organizationId',
    validate: payload => validProperties(payload, ['userId', 'organizationId'])
  },
  userattribute: {
    propertyName: config.get('ES.USER_ATTRIBUTE_PROPERTY_NAME'),
    relateKey: 'attributeId',
    validate: payload => validProperties(payload, ['userId', 'attributeId']),
    isNested: true // For ES index creation
  },
  userrole: {
    propertyName: config.get('ES.USER_ROLE_PROPERTY_NAME'),
    relateKey: 'roleId',
    validate: payload => validProperties(payload, ['userId', 'roleId'])
  },
  userskill: {
    propertyName: config.get('ES.USER_SKILL_PROPERTY_NAME'),
    relateKey: 'skillId',
    validate: payload => validProperties(payload, ['userId', 'skillId'])
  }
}

const organizationResources = {
  organizationskillprovider: {
    propertyName: config.get('ES.ORGANIZATION_SKILLPROVIDER_PROPERTY_NAME'),
    relateKey: 'skillProviderId',
    validate: payload => validProperties(payload, ['organizationId', 'skillProviderId']),
    enrich: {
      policyName: config.get('ES.ENRICHMENT.organization.enrichPolicyName'),
      matchField: 'id',
      enrichFields: ['id', 'name', 'created', 'updated', 'createdBy', 'updatedBy', 'skillProviders']
    }
  }
}

module.exports = {
  topResources, userResources, organizationResources
}
