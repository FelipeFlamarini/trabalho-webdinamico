export const ip = await fetch("https://api.ipify.org")
	.then(async (res) => {
        console.log(res)
		res.json().then(async (data) => {
			return data;
		});
	})
	.then(() => {});

console.log(ip);
console.log("aa");

export const port = process.env.PORT ? process.env.PORT : 3000;
export const URL = `http://${ip}:${port}`;
