import { useEffect, useState } from "react";
import { Icons } from "../../../../assets/icons";
import { Button } from "../../../../components/reusableComponents/Button";
import { Avatar } from "../../../../components/reusableComponents/Avatar";
import { useGetAuthMeQuery } from "../../../../services/auth/auth";
import { useAuth } from "../../../auth/hooks/useAuth";
import { VideoActions } from "./Actions";
import { current } from "@reduxjs/toolkit";

export const Image = ({ nextPost, data, isAlreadyFollowed }) => {
  const { user } = useAuth();
  const currentPost = nextPost?.user ? nextPost : data;

  const imageUrl = nextPost?.user ? nextPost?.mediaUrl : data?.mediaUrl;
  return (
    <div className="video-container h-full w-full flex justify-center gap-2">
      <div
        className={` flex justify-center items-center main-video-div relative h-full md:h-[95%] md:w-100 w-full bg-black`}
      >
        <img src={imageUrl} />
        <div className="creater-info flex ml-8 items-center text-white gap-4 absolute top-5 w-full ">
          <Avatar
            size="md"
            src={currentPost?.avatar || currentPost?.user?.profileImage}
          />
          <div className="username w-30  leading-tight flex flex-col">
            <h1 className="text-base line-clamp-1">
              {currentPost?.fullname || currentPost?.user?.fullname}
            </h1>
            <h2 className="text-sm line-clamp-1">
              {currentPost?.username || currentPost?.user?.username}
            </h2>
          </div>
          <Button
            content={
              isAlreadyFollowed ? (
                <div className="flex gap-2 items-center">
                  <h1>Followed </h1>
                  <Icons.followedIcon color="white" size={19} />{" "}
                </div>
              ) : nextPost ? (
                nextPost?.user?._id === user?._id ? (
                  "You"
                ) : (
                  "Follow"
                )
              ) : data?.userId === user?._id ? (
                "You"
              ) : (
                "Follow"
              )
            }
            background="bg-pink-600"
            border="rounded"
          />
        </div>
        <div className="video-metadata w-70 ml-5  absolute bottom-10 text-white">
          <h1 className="video-title line-clamp-3 font-bold">
            {currentPost?.title || currentPost?.postdata} #reelnest
          </h1>
        </div>
        !
      </div>
      <VideoActions
        key={currentPost?._id}
        likesLength={currentPost?.likes?.length}
        data={data}
        nextPost={nextPost}
      />
    </div>
  );
};
