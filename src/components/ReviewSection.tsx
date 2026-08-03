'use client'

import { Review } from '@/types'

interface ReviewSectionProps {
  reviews: Review[]
  productId: string
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    )
  }

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">{averageRating.toFixed(1)}</div>
          <div className="text-sm text-muted-foreground">{reviews.length} reviews</div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                {review.userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{review.userName}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {review.comment && <p className="text-muted-foreground mt-2">{review.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
