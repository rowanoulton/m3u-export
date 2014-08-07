m3u-export
---

Make local itunes-exported playlists easily shareable

If you've ever tried to export a playlist from iTunes to share it with someone then you may be familiar with the following predicament:

![](http://i.imgur.com/5eSeHpU.jpg)

The playlist is tied to your filesystem. This sucks, manually extracting the mp3s and editing the m3u can be painful.

This module provides a commandline tool to quickly copy the music files into your local directory and remove the references to your local filesystem from the .m3u file as well.

### How to use

Install the module globally:

```
npm install -g m3u-export
```

Then run it against your playlist:

```
m3u-export your-favourite-playlist.m3u
```

The original file will be overwritten with the pruned version, and the local directory will have the mp3s copied into it, allowing you to quickly compress and share your playlists.

You can pass any number of playlists in at the same time:

```
> m3u-export playlist1.m3u playlist2.m3u playlist3.m3u
Exported playlist1.m3u
Exported playlist2.m3u
Exported playlist3.m3u
```

### Quick example

Consider the following `.m3u` file:

```
#EXTM3U
/Path/to/iTunes/Library/Kyoto.mp3
#EXTINF:218,Purple Heart - Waldo
/Path/to/iTunes/Library/02 Purple Heart.mp3
#EXTINF:218,The Walk - Mayer Hawthorne
/Path/to/iTunes/Library/05 The Walk.mp3
#EXTINF:245,The Wire - Haim
/Path/to/iTunes/Library/03 The Wire.mp3
```

The `m3u-export` module would prune out every instance of `/Path/to/iTunes/Library/`, giving the following output:

```
#EXTM3U
Kyoto.mp3
#EXTINF:218,Purple Heart - Waldo
02 Purple Heart.mp3
#EXTINF:218,The Walk - Mayer Hawthorne
05 The Walk.mp3
#EXTINF:245,The Wire - Haim
03 The Wire.mp3
```

In addition, your local directory would also contain not only the updated `.m3u` but also the `.mp3` files for each song, copied out of your iTunes library (or from where ever they were referenced in the list).

### Tests

Sorry :grimacing: