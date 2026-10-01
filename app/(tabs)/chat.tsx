import SafeAreaView from "@/components/common/SafeAreaView";
import { Colors } from "@/constants/Colors";
import { SAMPLE_PRODUCTS } from "@/constants/data/products";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface Message {
  id: string;
  sender: "me" | "seller";
  text: string;
  timestamp: string;
  image?: string;
}

export interface Conversation {
  id: string;
  sellerName: string;
  sellerAvatar: string;
  isOnline: boolean;
  itemTitle: string;
  itemPrice: string;
  itemImage: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    sellerName: "Sokha Electronics",
    sellerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    isOnline: true,
    itemTitle: "iPhone 15 Pro Max 256GB Natural Titanium",
    itemPrice: "$1,150",
    itemImage:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
    lastMessage: "Yes, it is still available! Warranty valid for 8 months.",
    lastMessageTime: "2m ago",
    unreadCount: 2,
    messages: [
      {
        id: "m1",
        sender: "me",
        text: "Hello! Is this iPhone 15 Pro Max still available?",
        timestamp: "10:30 AM",
      },
      {
        id: "m2",
        sender: "seller",
        text: "Yes, it is still available! Warranty valid for 8 months.",
        timestamp: "10:32 AM",
      },
      {
        id: "m3",
        sender: "seller",
        text: "You can come test it at Toul Kork anytime today.",
        timestamp: "10:33 AM",
      },
    ],
  },
  {
    id: "conv-2",
    sellerName: "Angkor Motors KH",
    sellerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    isOnline: false,
    itemTitle: "Lexus RX350 2021 Super Full Option",
    itemPrice: "$68,500",
    itemImage:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600",
    lastMessage: "Can you offer $67,000? I can arrange viewing tomorrow.",
    lastMessageTime: "1h ago",
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        sender: "me",
        text: "Hi, what is the best final price for this Lexus?",
        timestamp: "Yesterday",
      },
      {
        id: "m2",
        sender: "seller",
        text: "Can you offer $67,000? I can arrange viewing tomorrow.",
        timestamp: "1h ago",
      },
    ],
  },
  {
    id: "conv-3",
    sellerName: "Phnom Penh Property",
    sellerAvatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    isOnline: true,
    itemTitle: "Modern Condo 2 Bedrooms BKK1",
    itemPrice: "$145,000",
    itemImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
    lastMessage: "Here are the floor plan photos of the unit.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        sender: "seller",
        text: "Here are the floor plan photos of the unit.",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: "conv-4",
    sellerName: "Dara Camera Store",
    sellerAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    isOnline: false,
    itemTitle: "Sony A7IV Mirrorless Camera Body",
    itemPrice: "$2,100",
    itemImage:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    lastMessage: "Includes 2 extra original Sony batteries and 128GB SD card.",
    lastMessageTime: "3 days ago",
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        sender: "me",
        text: "Does it come with extra batteries?",
        timestamp: "3 days ago",
      },
      {
        id: "m2",
        sender: "seller",
        text: "Includes 2 extra original Sony batteries and 128GB SD card.",
        timestamp: "3 days ago",
      },
    ],
  },
];

const AUTO_REPLIES = [
  "Thanks for your message! Yes, this item is available for inspection.",
  "I can give a small discount if you can pickup today!",
  "Feel free to call me or drop by our store in Phnom Penh.",
  "Condition is 100% original, clean box and accessories included.",
];

const ChatScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    sellerName?: string;
    title?: string;
    price?: string;
    image?: string;
  }>();

  const [conversations, setConversations] =
    useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeTab, setActiveTab] = useState<"all" | "buying" | "selling">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // If redirected from product page with params, open or create chat automatically!
  useEffect(() => {
    if (params.sellerName || params.title) {
      const existing = conversations.find(
        (c) => c.sellerName === params.sellerName || c.itemTitle === params.title
      );
      if (existing) {
        setSelectedConv(existing);
      } else {
        const newConv: Conversation = {
          id: `conv-${Date.now()}`,
          sellerName: params.sellerName || "Verified Seller",
          sellerAvatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
          isOnline: true,
          itemTitle: params.title || "Selected Item",
          itemPrice: params.price || "$0",
          itemImage:
            params.image ||
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
          lastMessage: "Hi, I am interested in this item!",
          lastMessageTime: "Just now",
          unreadCount: 0,
          messages: [
            {
              id: `msg-${Date.now()}`,
              sender: "me",
              text: `Hi! I'm interested in "${params.title || "this item"}" listed for ${params.price || "sale"}. Is it still available?`,
              timestamp: "Just now",
            },
          ],
        };
        setConversations((prev) => [newConv, ...prev]);
        setSelectedConv(newConv);
      }
    }
  }, [params.sellerName, params.title]);

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalUnread = conversations.reduce(
    (acc, curr) => acc + curr.unreadCount,
    0
  );

  const handleOpenConversation = (conv: Conversation) => {
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
    );
    setSelectedConv({ ...conv, unreadCount: 0 });
  };

  const handleSendMessage = (textToSend?: string) => {
    const messageContent = textToSend || inputText;
    if (!messageContent.trim() || !selectedConv) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text: messageContent.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedConv = {
      ...selectedConv,
      lastMessage: messageContent.trim(),
      lastMessageTime: "Just now",
      messages: [...selectedConv.messages, newMsg],
    };

    setSelectedConv(updatedConv);
    setConversations((prev) =>
      prev.map((c) => (c.id === selectedConv.id ? updatedConv : c))
    );
    setInputText("");

    // Simulate real-time response from seller after 1.2s!
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyText =
        AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      const replyMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        sender: "seller",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setSelectedConv((prevSelected) => {
        if (!prevSelected || prevSelected.id !== updatedConv.id) return prevSelected;
        const autoUpdated = {
          ...prevSelected,
          lastMessage: replyText,
          lastMessageTime: "Just now",
          messages: [...prevSelected.messages, replyMsg],
        };
        setConversations((prevList) =>
          prevList.map((c) => (c.id === autoUpdated.id ? autoUpdated : c))
        );
        return autoUpdated;
      });
    }, 1400);
  };

  return (
    <SafeAreaView
      statusBarColor={Colors.primary.DEFAULT}
      statusBarStyle="light-content"
      className="bg-neutral-background flex-1"
    >
      {/* Top Header */}
      <View className="bg-primary px-4 py-3.5 flex-row items-center justify-between shadow-md">
        <View className="flex-row items-center gap-2">
          <Text className="text-white text-xl font-bold tracking-wide">
            Messages
          </Text>
          {totalUnread > 0 && (
            <View className="bg-secondary-orange px-2 py-0.5 rounded-full">
              <Text className="text-white text-xs font-bold">{totalUnread} new</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            const first = SAMPLE_PRODUCTS[0];
            router.push({
              pathname: "/(tabs)/chat",
              params: {
                sellerName: first.seller?.name || "Demo Seller",
                title: first.title,
                price: `$${first.price}`,
                image: first.image,
              },
            });
          }}
          className="flex-row items-center bg-white/20 px-3 py-1.5 rounded-full"
        >
          <Ionicons name="add-circle" size={16} color="white" />
          <Text className="text-white font-bold text-xs ml-1">New Demo Chat</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar & Filter Tabs */}
      <View className="bg-neutral-surface border-b border-neutral-border p-3 gap-3">
        {/* Search Input */}
        <View className="flex-row items-center bg-neutral-background px-3 py-2 rounded-xl border border-neutral-border">
          <Ionicons name="search" size={18} color={Colors.text.muted} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search messages, seller or item..."
            placeholderTextColor={Colors.text.muted}
            className="flex-1 ml-2 text-sm text-neutral-text-main py-0"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={16} color={Colors.text.muted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Segmented Category Filter Tabs */}
        <View className="flex-row gap-2">
          {[
            { id: "all", label: "All Chats" },
            { id: "buying", label: "Buying" },
            { id: "selling", label: "Selling" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-full border ${
                  isActive
                    ? "bg-primary border-primary"
                    : "bg-neutral-surface border-neutral-border"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    isActive ? "text-white" : "text-neutral-text-sub"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Conversation List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredConversations.length === 0 ? (
          <View className="items-center justify-center p-8 mt-10">
            <View className="w-20 h-20 bg-sky-50 rounded-full items-center justify-center mb-3">
              <Ionicons
                name="chatbubbles-outline"
                size={40}
                color={Colors.primary.DEFAULT}
              />
            </View>
            <Text className="text-base font-bold text-neutral-text-main text-center">
              No messages found
            </Text>
            <Text className="text-xs text-neutral-text-sub text-center mt-1">
              Start chatting with sellers on any item page to see messages here!
            </Text>
          </View>
        ) : (
          filteredConversations.map((conv) => (
            <TouchableOpacity
              key={conv.id}
              onPress={() => handleOpenConversation(conv)}
              activeOpacity={0.7}
              className={`flex-row items-center p-4 border-b border-neutral-border/60 ${
                conv.unreadCount > 0 ? "bg-sky-50/60" : "bg-neutral-surface"
              }`}
            >
              {/* Seller Avatar with Active Indicator */}
              <View className="relative mr-3.5">
                <Image
                  source={{ uri: conv.sellerAvatar }}
                  className="w-14 h-14 rounded-full bg-neutral-background border border-neutral-border"
                />
                {conv.isOnline && (
                  <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                )}
              </View>

              {/* Chat Info */}
              <View className="flex-1 mr-2">
                <View className="flex-row items-center justify-between mb-0.5">
                  <Text className="text-sm font-bold text-neutral-text-main">
                    {conv.sellerName}
                  </Text>
                  <Text className="text-[11px] text-neutral-text-sub">
                    {conv.lastMessageTime}
                  </Text>
                </View>

                {/* Item Chip Tag */}
                <View className="flex-row items-center bg-neutral-background px-2 py-0.5 rounded-md border border-neutral-border/50 self-start mb-1 gap-1">
                  <Image
                    source={{ uri: conv.itemImage }}
                    className="w-4 h-4 rounded"
                  />
                  <Text
                    className="text-[11px] font-semibold text-neutral-text-main"
                    numberOfLines={1}
                    style={{ maxWidth: 160 }}
                  >
                    {conv.itemTitle}
                  </Text>
                  <Text className="text-[11px] font-bold text-danger">
                    {conv.itemPrice}
                  </Text>
                </View>

                {/* Last Message Preview */}
                <Text
                  className={`text-xs ${
                    conv.unreadCount > 0
                      ? "font-bold text-neutral-text-main"
                      : "text-neutral-text-sub"
                  }`}
                  numberOfLines={1}
                >
                  {conv.lastMessage}
                </Text>
              </View>

              {/* Unread Pill Badge */}
              {conv.unreadCount > 0 && (
                <View className="w-5 h-5 bg-secondary-orange rounded-full items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">
                    {conv.unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Interactive Conversation Modal / Thread */}
      <Modal
        visible={!!selectedConv}
        animationType="slide"
        onRequestClose={() => setSelectedConv(null)}
      >
        {selectedConv && (
          <SafeAreaView className="flex-1 bg-neutral-background">
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1"
            >
              {/* Chat Thread Header */}
              <View className="bg-primary px-3 py-3 flex-row items-center justify-between shadow-md">
                <View className="flex-row items-center flex-1">
                  <TouchableOpacity
                    onPress={() => setSelectedConv(null)}
                    className="p-1 mr-1"
                  >
                    <Ionicons name="arrow-back" size={24} color="white" />
                  </TouchableOpacity>

                  {/* Avatar & Info */}
                  <Image
                    source={{ uri: selectedConv.sellerAvatar }}
                    className="w-10 h-10 rounded-full border border-white/40 mr-2.5"
                  />
                  <View className="flex-1">
                    <Text className="text-white font-bold text-base" numberOfLines={1}>
                      {selectedConv.sellerName}
                    </Text>
                    <Text className="text-sky-100 text-[11px]">
                      {selectedConv.isOnline ? "Online Now • Usually replies in ~5 mins" : "Offline"}
                    </Text>
                  </View>
                </View>

                {/* Call Seller Quick Shortcut */}
                <TouchableOpacity
                  onPress={() =>
                    alert(`Calling ${selectedConv.sellerName} at 012 345 678`)
                  }
                  className="bg-secondary-orange p-2 rounded-full shadow-sm"
                >
                  <Ionicons name="call" size={18} color="white" />
                </TouchableOpacity>
              </View>

              {/* Item Header Banner */}
              <View className="bg-white px-4 py-2.5 flex-row items-center border-b border-neutral-border shadow-xs">
                <Image
                  source={{ uri: selectedConv.itemImage }}
                  className="w-12 h-12 rounded-lg mr-3 bg-neutral-background border border-neutral-border"
                />
                <View className="flex-1 mr-2">
                  <Text className="text-xs font-bold text-neutral-text-main" numberOfLines={1}>
                    {selectedConv.itemTitle}
                  </Text>
                  <Text className="text-sm font-bold text-danger">
                    {selectedConv.itemPrice}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    const found = SAMPLE_PRODUCTS.find(
                      (p) => p.title === selectedConv.itemTitle
                    );
                    setSelectedConv(null);
                    if (found) {
                      router.push(`/(categories)/product/${found.id}`);
                    }
                  }}
                  className="bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-200"
                >
                  <Text className="text-xs font-bold text-primary">View Item</Text>
                </TouchableOpacity>
              </View>

              {/* Messages Feed */}
              <ScrollView
                className="flex-1 p-4"
                contentContainerStyle={{ paddingBottom: 20 }}
                ref={(ref) => {
                  if (ref) ref.scrollToEnd({ animated: true });
                }}
              >
                {/* Safety Warning */}
                <View className="bg-amber-50 p-3 rounded-xl border border-amber-200 mb-4 items-center">
                  <Ionicons name="shield-checkmark" size={20} color="#D97706" />
                  <Text className="text-amber-800 text-[11px] text-center font-medium mt-1">
                    Safety Tip: Inspect item carefully & test functionality in person before making payment.
                  </Text>
                </View>

                {/* Message Bubbles */}
                {selectedConv.messages.map((msg) => {
                  const isMe = msg.sender === "me";
                  return (
                    <View
                      key={msg.id}
                      className={`mb-3 flex-row ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <View
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                          isMe
                            ? "bg-primary rounded-tr-xs"
                            : "bg-white border border-neutral-border rounded-tl-xs shadow-xs"
                        }`}
                      >
                        <Text
                          className={`text-sm ${
                            isMe ? "text-white" : "text-neutral-text-main"
                          }`}
                        >
                          {msg.text}
                        </Text>
                        <View className="flex-row items-center justify-end gap-1 mt-1">
                          <Text
                            className={`text-[10px] ${
                              isMe ? "text-sky-200" : "text-neutral-text-muted"
                            }`}
                          >
                            {msg.timestamp}
                          </Text>
                          {isMe && (
                            <Ionicons name="checkmark-done" size={14} color="#7DD3FC" />
                          )}
                        </View>
                      </View>
                    </View>
                  );
                })}

                {/* Typing Indicator Bubble */}
                {isTyping && (
                  <View className="flex-row justify-start mb-3">
                    <View className="bg-white border border-neutral-border px-4 py-2.5 rounded-2xl rounded-tl-xs flex-row items-center gap-1.5">
                      <View className="w-2 h-2 rounded-full bg-neutral-text-muted animate-pulse" />
                      <View className="w-2 h-2 rounded-full bg-neutral-text-muted animate-pulse" />
                      <View className="w-2 h-2 rounded-full bg-neutral-text-muted animate-pulse" />
                      <Text className="text-xs text-neutral-text-sub ml-1 italic">
                        {selectedConv.sellerName} is typing...
                      </Text>
                    </View>
                  </View>
                )}
              </ScrollView>

              {/* Quick Reply Suggestions */}
              <View className="px-3 py-1.5 bg-white border-t border-neutral-border">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row gap-2 py-1">
                    {[
                      "Is this still available?",
                      "What is the lowest price?",
                      "Can we meet at Toul Kork?",
                      "Can you send more photos?",
                    ].map((suggestion, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => handleSendMessage(suggestion)}
                        className="bg-neutral-background px-3 py-1.5 rounded-full border border-neutral-border"
                      >
                        <Text className="text-xs font-semibold text-neutral-text-main">
                          {suggestion}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Bottom Input Controls */}
              <View className="bg-white p-3 border-t border-neutral-border flex-row items-center gap-2">
                <TouchableOpacity
                  onPress={() =>
                    handleSendMessage("📷 [Photo attachment: item_preview.jpg]")
                  }
                  className="p-2 rounded-full bg-neutral-background"
                >
                  <Ionicons name="camera" size={22} color={Colors.primary.DEFAULT} />
                </TouchableOpacity>

                <TextInput
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Type a message..."
                  placeholderTextColor={Colors.text.muted}
                  className="flex-1 bg-neutral-background px-4 py-2.5 rounded-full border border-neutral-border text-sm text-neutral-text-main max-h-24"
                />

                <TouchableOpacity
                  onPress={() => handleSendMessage()}
                  className={`w-10 h-10 rounded-full items-center justify-center ${
                    inputText.trim() ? "bg-primary" : "bg-neutral-border"
                  }`}
                  disabled={!inputText.trim()}
                >
                  <Ionicons name="send" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default ChatScreen;
