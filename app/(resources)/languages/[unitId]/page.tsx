import { redirect } from "next/navigation"

export default function LanguageCatchAll({ params }: { params: { slug?: string[] } }) {
  // If there's only one segment, it's the old format
  if (params.slug && params.slug.length === 1) {
    const id = params.slug[0]

    // Extract unit and lesson IDs from the legacy format
    // This is a simple redirect that assumes the ID format was "unitId-lessonId"
    const [unitId, lessonId] = id.includes("-") ? id.split("-", 2) : ["beginner-unit-1", "greetings"] // Default fallback

    // Redirect to the new URL structure
    redirect(`/languages/${unitId}/${lessonId}`)
  }

  // If there are two segments, it's the new format - redirect to the proper page
  else if (params.slug && params.slug.length === 2) {
    const [unitId, lessonId] = params.slug
    redirect(`/languages/${unitId}/${lessonId}`)
  }

  // If no segments, redirect to home
  else {
    redirect("/")
  }
}
