export function useIpInfo() {
    async function fetchIpInfo() {
        const token = import.meta.env.VITE_IPINFO_TOKEN
        const response = await fetch("https://api.ipinfo.io/lite/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return null; // Handle error or return null if the request fails
        }

        const data = await response.json();
        return data;

    }

    return { fetchIpInfo }
}