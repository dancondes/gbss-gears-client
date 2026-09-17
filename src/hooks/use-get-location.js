import useMessageModal from "./use-message-modal";

export function useGetLocation() {
    const { showMessageModal } = useMessageModal()

    async function getLocation() {
        const permission = await navigator.permissions.query({
            name: "geolocation",
        });

        if (permission.state === "granted" || permission.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position.coords);
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            showMessageModal("Location access is denied. Please enable location permissions in your browser settings.", {
                type: "error",
                title: "Location Access Denied",
            })
        }
    }

    return { getLocation }
}