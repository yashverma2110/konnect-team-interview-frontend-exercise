<template>
  <BaseCard>
    <div class="service-details-card__content">
      <section class="service-details-card__status">
        <div class="service-details-card__status-identifier">
          <ServiceStatusIcons
            :service="props.service"
            size="xs"
          />
          <BaseTypography
            color="secondary"
            data-testid="service-status-identifier"
            size="xs"
            tag="p"
            weight="regular"
          >
            {{ serviceStatusIdentifier }}
          </BaseTypography>
        </div>

        <BasePill
          v-if="getServiceStatus(props.service) === 'published'"
          data-testid="service-version-count"
          :label="getHumanizedVersionCount(props.service)"
          rounded="full"
        />
      </section>
      <BaseTypography
        data-testid="service-name"
        size="lg"
        tag="h2"
        weight="semibold"
      >
        {{ props.service.name }}
      </BaseTypography>
      <BaseTypography
        color="secondary"
        data-testid="service-description"
        size="sm"
        tag="p"
        weight="regular"
      >
        {{ props.service.description }}
      </BaseTypography>

      <ul
        v-if="getServiceStatus(props.service) === 'published'"
        class="service-catalog__metrics"
      >
        <li>
          <BaseTypography
            data-testid="service-latency"
            size="xs"
            tag="span"
            weight="semibold"
          >
            {{ props.service.metrics.latency }}ms
          </BaseTypography>
          <BaseTypography
            color="secondary"
            size="xs"
            tag="span"
            weight="semibold"
          >
            latency
          </BaseTypography>
        </li>
        <li>
          <BaseTypography
            data-testid="service-uptime"
            size="xs"
            tag="span"
            weight="semibold"
          >
            {{ props.service.metrics.uptime }}%
          </BaseTypography>
          <BaseTypography
            color="secondary"
            size="xs"
            tag="span"
            weight="semibold"
          >
            uptime
          </BaseTypography>
        </li>
        <li>
          <BaseTypography
            data-testid="service-requests"
            size="xs"
            tag="span"
            weight="semibold"
          >
            {{ humanizeNumberUsingAbbreviation(props.service.metrics.requests) }}
          </BaseTypography>
          <BaseTypography
            color="secondary"
            size="xs"
            tag="span"
            weight="semibold"
          >
            requests
          </BaseTypography>
          <BaseTypography
            color="secondary"
            size="xs"
            tag="span"
            weight="semibold"
          >
            •
          </BaseTypography>
          <BaseTypography
            data-testid="service-errors"
            size="xs"
            tag="span"
            weight="semibold"
          >
            {{ props.service.metrics.errors }}%
          </BaseTypography>
          <BaseTypography
            color="secondary"
            size="xs"
            tag="span"
            weight="semibold"
          >
            errors
          </BaseTypography>
        </li>
      </ul>
      <ul
        v-else
        class="service-catalog__metrics disabled"
      >
        <li>
          <BaseTypography
            color="secondary"
            data-testid="service-not-configured-message"
            size="xs"
            tag="p"
            weight="semibold"
          >
            Not configured with runtime yet
          </BaseTypography>
        </li>
      </ul>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BasePill from '@/components/ui/BasePill.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseTypography from '@/components/ui/BaseTypography.vue'
import type { IService } from '@/types/IService'
import useServices from '@/composables/useServices'
import { humanizeNumberUsingAbbreviation, humanizeServiceStatus } from '@/utils/humanization'
import ServiceStatusIcons from '../ServiceStatusIcons.vue'

const props = defineProps<{
  service: IService
}>()

const { getServiceStatus } = useServices()

const serviceStatusIdentifier = computed(() => {
  const status = humanizeServiceStatus(getServiceStatus(props.service))

  return status
})

function getHumanizedVersionCount(service: IService) {
  const suffix = service.versions.length > 1 ? 's' : ''

  return `${service.versions.length} Version${suffix}`
}
</script>

<style lang="scss" scoped>
@use '@/css/variables/colors.scss' as colors;
@use '@/css/variables/typography.scss' as typography;

.service-details-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 12rem;
}

.service-details-card__status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
}

.service-details-card__status-identifier {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.service-catalog__metrics {
  margin-top: auto;
  padding-inline-start: 20px;
  list-style: disc;

  li::marker {
    color: colors.$green-primary;
  }

  &.disabled {
    li::marker {
      color: colors.$text-color-secondary;
    }
  }
}
</style>
