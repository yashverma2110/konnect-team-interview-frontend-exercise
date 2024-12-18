<template>
  <div
    class="service-details__container"
    data-testid="service-details-container"
  >
    <BaseButton
      variant="transparent"
      @click="goBack"
    >
      <BaseTypography
        size="base"
        tag="span"
        weight="semibold"
      >
        <FontAwesomeIcon :icon="faArrowLeft" />
        Back
      </BaseTypography>
    </BaseButton>
    <div
      v-if="loading"
      class="service-catalog__loading-icon-container"
    >
      <FontAwesomeIcon
        class="service-catalog__loading-icon"
        :icon="faSpinner"
      />
    </div>
    <div
      v-else-if="serviceDetails"
      class="service-details"
    >
      <div
        class="service-catalog__header"
      >
        <BaseTypography
          size="xl"
          tag="h1"
          weight="bold"
        >
          {{ serviceDetails?.name }}
        </BaseTypography>

        <div class="service-catalog__header-status">
          <ServiceStatusIcons
            :service="serviceDetails"
          />
          <BaseTypography
            color="secondary"
            size="base"
            tag="p"
            weight="regular"
          >
            {{ humanizeServiceStatus(serviceStatus) }}
          </BaseTypography>
        </div>
      </div>
      <BaseTypography
        size="base"
        tag="p"
        weight="regular"
      >
        {{ serviceDetails?.description }}
      </BaseTypography>

      <section
        v-if="serviceStatus === 'published'"
        class="service-details__metrics-container"
      >
        <ul class="service-details__metrics-container-list">
          <li>
            <BaseTypography
              size="xs"
              tag="span"
              weight="semibold"
            >
              {{ serviceDetails?.metrics.latency }}ms
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
              size="xs"
              tag="span"
              weight="semibold"
            >
              {{ serviceDetails?.metrics.uptime }}%
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
              size="xs"
              tag="span"
              weight="semibold"
            >
              {{ humanizeNumberUsingAbbreviation(serviceDetails?.metrics.requests ?? 0) }}
            </BaseTypography>
            <BaseTypography
              color="secondary"
              size="xs"
              tag="span"
              weight="semibold"
            >
              requests
            </BaseTypography>
          </li>
          <li>
            <BaseTypography
              size="xs"
              tag="span"
              weight="semibold"
            >
              {{ serviceDetails?.metrics.errors }}%
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
      </section>

      <section class="service-details__versions">
        <div class="service-details__versions-header">
          <BaseTypography
            size="base"
            tag="h2"
            weight="semibold"
          >
            Versions ({{ serviceDetails?.versions.length }})
          </BaseTypography>
        </div>
        <div
          v-for="(version, index) in serviceDetails?.versions"
          :key="version.id"
          class="service-details__versions-table"
        >
          <div
            class="service-details__versions-table-row"
            data-testid="service-details-versions-table-row"
          >
            <div class="service-details__versions-table-cell">
              <div class="service-details__versions-table-cell-item">
                <BaseTypography
                  size="sm"
                  tag="span"
                  weight="semibold"
                >
                  v{{ version.name }}
                </BaseTypography>
              </div>
              <div class="service-details__versions-table-cell-item">
                <BaseTypography
                  color="secondary"
                  size="xs"
                  tag="p"
                  weight="regular"
                >
                  {{ version.description }}
                </BaseTypography>
              </div>
              <div class="service-details__versions-table-cell-item">
                <div class="service-details__versions-table-pill-container">
                  <BasePill
                    label="HTTP"
                    variant="primary"
                  />
                  <BasePill
                    label="REST"
                    variant="secondary"
                  />
                </div>
              </div>
              <div
                v-if="serviceStatus === 'published'"
                class="service-details__versions-table-cell-item"
              >
                <div class="service-details__versions-table-avatar-group">
                  <BaseAvatarGroup
                    :avatars="developerAvatars"
                  />
                </div>
                <div>
                  <BaseTypography
                    data-testid="developer-name"
                    size="sm"
                    tag="p"
                    weight="semibold"
                  >
                    {{ version.developer?.name }}
                  </BaseTypography>
                  <BaseTypography
                    color="secondary"
                    data-testid="version-updated-at"
                    size="xs"
                    tag="p"
                    weight="regular"
                  >
                    {{ getDurationSince(new Date(version.updated_at)) }} ago
                  </BaseTypography>
                </div>
              </div>
            </div>
          </div>
          <hr
            v-if="index < (serviceDetails?.versions.length ?? 0) - 1"
            class="service-details__versions-table-row-divider"
          >
        </div>
      </section>
    </div>
    <div
      v-else-if="error"
      data-testid="no-results"
    >
      <BaseCard>
        <BaseTypography
          color="secondary"
          size="base"
          tag="span"
          weight="regular"
        >
          <FontAwesomeIcon
            class="service-catalog__no-results-icon"
            :icon="faExclamationTriangle"
          />
          Unable to fetch services, please raise a ticket with support if issue persists.
        </BaseTypography>
      </BaseCard>
    </div>
    <div
      v-else
      class="service-details__not-found"
    >
      <BaseCard>
        <BaseTypography
          size="base"
          tag="h2"
          weight="semibold"
        >
          <FontAwesomeIcon :icon="faExclamationTriangle" />
          Service not found
        </BaseTypography>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { faArrowLeft, faExclamationTriangle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BasePill from '@/components/ui/BasePill.vue'
import BaseAvatarGroup from '@/components/ui/BaseAvatarGroup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseTypography from '@/components/ui/BaseTypography.vue'
import useServicesStore from '@/stores/services'
import BaseCard from '@/components/ui/BaseCard.vue'
import ServiceStatusIcons from '@/components/ServiceStatusIcons.vue'
import useServices from '@/composables/useServices'
import { humanizeNumberUsingAbbreviation, humanizeServiceStatus } from '@/utils/humanization'
import { getDurationSince } from '@/utils/timeUtils'

const servicesStore = useServicesStore()
const { loading, error, getServiceStatus, fetchServices } = useServices()

const route = useRoute()
const router = useRouter()

const serviceDetails = computed(() => servicesStore.getServiceById(route.params.id as string))
const developerAvatars = computed(() => {
  const avatars = []

  for (const version of serviceDetails.value?.versions ?? []) {
    if (version.developer?.avatar) {
      avatars.push({ src: version.developer.avatar, alt: version.developer.name })
    }
  }

  return avatars
})

const serviceStatus = computed(() => serviceDetails.value && getServiceStatus(serviceDetails.value))

onMounted(async () => {
  if (servicesStore.servicesToDisplay.length === 0) {
    await fetchAndStoreServices()
  }
})

async function fetchAndStoreServices() {
  const { success, data } = await fetchServices()

  if (success) {
    servicesStore.setAllServices(data)
  }
}

function goBack() {
  router.go(-1)
}
</script>

<style scoped lang="scss">
@use '@/css/variables/background.scss' as vars;
@use '@/css/variables/colors.scss' as colors;
@use '@/css/variables/typography.scss' as typography;
@use '@/css/variables/breakpoints.scss' as breakpoints;

.service-details__container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service-catalog__loading-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.service-catalog__loading-icon {
  animation: spin 1s linear infinite;
  color: colors.$text-color-secondary;
  font-size: typography.$font-size-xl;
}

.service-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service-catalog__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.service-catalog__header-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.service-details__versions-header {
  margin-bottom: 1.5rem;
}

.service-details__metrics-container {
  display: flex;
  align-items: center;
}

.service-details__metrics-container-list {
  display: flex;
  gap: 2rem;
  padding-inline-start: 1rem;

  li::marker {
    color: colors.$green-primary;
  }
}

.service-details__versions {
  background: vars.$white;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
}

.service-details__versions-table {
  width: 100%;
}

.service-details__versions-table-pill-container {
  display: flex;
  gap: 0.25rem;
}

.service-details__versions-table-avatar-group {
  width: 5rem;
}

.service-details__versions-table-cell {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 2fr;

  &-item {
    display: flex;
    align-items: center;
  }
}

.service-details__versions-table-row-divider {
  border: 1px solid colors.$dark-secondary;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: breakpoints.$breakpoint-md) {
  .service-catalog__header {
    flex-direction: column;
    gap: 1rem;
  }

  .service-catalog__header-status {
    width: 100%;
    text-align: left;
  }

  .service-details__metrics-container {
    width: 100%;
  }

  .service-details__metrics-container-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    width: 100%;
  }

  .service-details__versions-table-cell {
    grid-template-columns: 2fr 1fr;
    gap: 0.5rem;
  }
}
</style>
