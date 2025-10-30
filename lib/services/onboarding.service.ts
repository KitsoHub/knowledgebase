// import prisma from '@/lib/prisma'
const createURL = (path: string) => window.location.origin + path

export const newEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/onboarding'), {
      method: 'POST',
      // body: JSON.stringify({ content: 'new entry' }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

// type OnboardingInput = {
//     researchPurpose: string;
//     organization?: string;
//     interests: string[];
//     termsAccepted: boolean;
//     userId: string; // User ID from Clerk
//   };

//   export async function createOnboarding(data:OnboardingInput){
//     try {
//         return await prisma.onboarding.create({
//             data: {
//               researchPurpose: data.researchPurpose,
//               organization: data.organization,
//               interests: data.interests,
//               termsAccepted: data.termsAccepted,
//               user: { connect: { id: data.userId } },
//             },
//           });
// // Add route to somewhere
//     } catch (error) {throw error;

//     }
//   }

// export const createOnboarding = async({
//     researchPurpose,
//     organization,
//     interests,
//     termsAccepted,
//     userId,
// }: OnboardingInput) => {
//     try {
//         return await prisma.onboarding.create({
//           data: {
//             researchPurpose,
//             organization,
//             interests,
//             termsAccepted,
//             user: { connect: { id: userId } },
//           },
//         });
//       } catch (error) {
//         // Handle specific errors (e.g., uniqueness constraints)
//         throw error;
//       }
//   }

//   export const getOnboardingByUser = async (userId: string) => {
//     return prisma.onboarding.findUnique({
//       where: { userId },
//     });
//   };

//   export const updateOnboarding = async (id: string, data: OnboardingInput) => {
//     return prisma.onboarding.update({
//       where: { id },
//       data,
//     });
//   };
