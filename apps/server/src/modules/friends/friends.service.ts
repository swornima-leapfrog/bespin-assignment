import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendsRepository } from './repository/friends.repository';

@Injectable()
export class FriendsService {
  constructor(private readonly friendsRepository: FriendsRepository) {}

  getAllFriends(currentUserId: number) {
    return this.friendsRepository.getAllFriends(currentUserId);
  }

  async checkFriendRequestExists(currentUserId: number, targetUserId: number) {
    const sentFriendRequest = await this.friendsRepository.friendRequestExists(
      currentUserId,
      targetUserId,
    );

    const receivedFriendRequest =
      await this.friendsRepository.friendRequestExists(
        targetUserId,
        currentUserId,
      );

    return !!sentFriendRequest.length || !!receivedFriendRequest.length;
  }

  async sendFriendRequest(currentUserId: number, targetUserId: number) {
    if (currentUserId === targetUserId) {
      throw new BadRequestException('Cannot send friend request to yourself');
    }

    const doesFriendRequestExist = await this.checkFriendRequestExists(
      currentUserId,
      targetUserId,
    );

    if (doesFriendRequestExist) {
      throw new BadRequestException('Friend request already sent');
    }

    return this.friendsRepository.sendFriendRequest(
      currentUserId,
      targetUserId,
    );
  }

  getSentRequests(currentUserId: number) {
    return this.friendsRepository.getSentRequests(currentUserId);
  }

  getRequests(currentUserId: number) {
    return this.friendsRepository.getRequests(currentUserId);
  }

  rejectRequest(currentUserId: number, targetUserId: number) {
    return this.friendsRepository.removeRequest(currentUserId, targetUserId);
  }

  async acceptRequest(currentUserId: number, targetUserId: number) {
    await this.friendsRepository.removeRequest(currentUserId, targetUserId);
    return this.friendsRepository.acceptRequest(currentUserId, targetUserId);
  }

  getRecommendations(currentUserId: number) {
    return this.friendsRepository.recommendFriends(currentUserId);
  }
}
