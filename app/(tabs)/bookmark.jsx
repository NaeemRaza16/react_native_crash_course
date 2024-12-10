import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getSavedPosts } from "../../lib/appwrite";
import { EmptyState } from "../../components/EmptyState";
import { SearchInput } from "../../components/SearchInput";
import { VideoCard } from "../../components/VideoCard";

const Bookmark = () => {
  const { data: posts, refetch } = useAppwrite(getSavedPosts);

  // console.log(posts)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // console.log(posts)

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-2xl font-psemibold text-white">
                  Saved Videos
                </Text>
              </View>
            </View>

            <SearchInput 
              placeholder="Search your saved videos"
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos saved yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
