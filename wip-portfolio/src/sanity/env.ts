export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-31'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

// export const fbAPIKey = assertValue(
//   process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   'Missing environment variable: NEXT_PUBLIC_FIREBASE_API_KEY'
// )

// export const fbAuthDomain = assertValue(
//   process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   'Missing environment variable: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'
// )

// export const fbProjectID = assertValue(
//   process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   'Missing environment variable: NEXT_PUBLIC_FIREBASE_PROJECT_ID'
// )

// export const fbStorageBucket = assertValue(
//   process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   'Missing environment variable: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'
// )

// export const fbMessagingSenderID = assertValue(
//   process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   'Missing environment variable: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'
// )

// export const fbPUBLICID = assertValue(
//   process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   'Missing environment variable: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'
// )




function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
