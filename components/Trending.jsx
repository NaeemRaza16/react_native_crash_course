// import { useState } from "react";
// import { ResizeMode, Video } from "expo-av";
// import * as Animatable from "react-native-animatable";
// import {
//   FlatList,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
// } from "react-native";

// import { icons } from "../constants";

// const zoomIn = {
//   0: {
//     scale: 0.9,
//   },
//   1: {
//     scale: 1,
//   },
// };

// const zoomOut = {
//   0: {
//     scale: 1,
//   },
//   1: {
//     scale: 0.9,
//   },
// };

// const TrendingItem = ({ activeItem, item }) => {
//   const [play, setPlay] = useState(false);

//   return (
//     <Animatable.View
//       className="mr-5"
//       animation={activeItem === item.$id ? zoomIn : zoomOut}
//       duration={500}
//     >
//       {play ? (
//         <Video
//           source={{ uri: item.video }}
//           className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
//           resizeMode={ResizeMode.CONTAIN}
//           useNativeControls
//           shouldPlay
//           onPlaybackStatusUpdate={(status) => {
//             if (status.didJustFinish) {
//               setPlay(false);
//             }
//           }}
//         />
//         // <Text>Video</Text>
//       ) : (
//         <TouchableOpacity
//           className="relative flex justify-center items-center"
//           activeOpacity={0.7}
//           onPress={() => setPlay(true)}
//         >
//           <ImageBackground
//             source={{
//               uri: item.thumbnail,
//             }}
//             className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
//             resizeMode="cover"
//           />

//           <Image
//             source={icons.play}
//             className="w-12 h-12 absolute"
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       )}
//     </Animatable.View>
//   );
// };

// export const Trending = ({ posts }) => {
//   const [activeItem, setActiveItem] = useState(posts[1]);

//   const viewableItemsChanged = ({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setActiveItem(viewableItems[0].key);
//     }
//   };

//   return (
//     <FlatList
//       data={posts}
//       horizontal
//       keyExtractor={(item) => item.$id}
//       renderItem={({ item }) => (
//         <TrendingItem activeItem={activeItem} item={item} />
//       )}
//       onViewableItemsChanged={viewableItemsChanged}
//       viewabilityConfig={{
//         itemVisiblePercentThreshold: 70,
//       }}
//       contentOffset={{ x: 170 }}
//     />
//   );
// };

import { useState } from "react";
import * as Animatable from "react-native-animatable";
import { FlatList, Image, ImageBackground, TouchableOpacity } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = false;
  });

  const [showVideo, setShowVideo] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {showVideo ? (
        <VideoView
          style={{
            width: 208, // w-52
            height: 288, // h-72
            borderRadius: 33,
            marginTop: 12, // mt-3
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          onPlayerStatusUpdate={(status) => {
            if (status.playbackState === "ended") {
              setShowVideo(false); // Hide video when playback ends
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setShowVideo(true);
            player.play(); // Start playback when the video is shown
          }}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};
