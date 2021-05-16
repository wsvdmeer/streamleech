import {writable} from 'svelte/store';
//export const torrentStore = writable({});
export const magnet = writable('');

magnet.subscribe(value => {
	console.log('magnet : '+value);
}); // logs '0'