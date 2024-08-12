import { useRevalidator } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function CancelModal({
  showCancelModal,
  setShowCancelModal,
  offerId,
}) {
  const { auth } = useAuth()
  const revalidator = useRevalidator()

  const handleCancel = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${
          auth.id
        }/applications/${offerId}`,
        {
          method: 'delete',
          credentials: 'include',
        },
      )
      if (response.status !== 204) {
        throw new Error('error while canceling application')
      }
      setShowCancelModal(false)
      return revalidator.revalidate()
    }
    catch (error) {
      throw new Error(error.message)
    }
  }
  return (
    <div
      className={
        showCancelModal
          ? `absolute top-0 left-0 flex items-center justify-center w-screen h-screen z-[100000] bg-black/80 backdrop-blur overflow-y-hidden px-4`
          : `hidden`
      }
    >
      <section className="flex flex-col items-center text-center bg-gray-200 w-[35rem] p-4 rounded-lg">
        <h1 className="text-base md:text-xl">
          Are you sure to cancel this application ?
        </h1>
        <p className="mt-4 text-xs text-gray-600 md:text-base">
          You are about to cancel the application for this offer. Once confirmed
          you will not be able to recover it.
        </p>
        <div className="flex gap-4 mt-4">
          <button
            className="px-4 py-2 text-sm border-2 border-gray-300 rounded-lg md:text-base"
            type="button"
            onClick={() => setShowCancelModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg md:text-base"
            type="button"
            onClick={handleCancel}
          >
            Confirm
          </button>
        </div>
      </section>
    </div>
  )
}
