import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendsRepository } from './repository/friends.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepository: FriendsRepository,
    private readonly usersService: UsersService,
  ) {}

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

    await this.usersService.getUserById(targetUserId);

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

  async rejectRequest(currentUserId: number, targetUserId: number) {
    await this.usersService.getUserById(targetUserId);

    const doesFriendRequestExist = await this.checkFriendRequestExists(
      currentUserId,
      targetUserId,
    );

    if (!doesFriendRequestExist) {
      throw new BadRequestException('Friend request does not exist');
    }

    await this.friendsRepository.removeRequest(currentUserId, targetUserId);

    return { message: `User of id ${targetUserId} has been rejected` };
  }

  async acceptRequest(currentUserId: number, targetUserId: number) {
    await this.usersService.getUserById(targetUserId);

    const doesFriendRequestExist = await this.checkFriendRequestExists(
      currentUserId,
      targetUserId,
    );

    if (!doesFriendRequestExist) {
      throw new BadRequestException('Friend request does not exist');
    }

    await this.friendsRepository.removeRequest(currentUserId, targetUserId);
    return this.friendsRepository.acceptRequest(currentUserId, targetUserId);
  }

  async getRecommendations(currentUserId: number) {
    const sentRequestsPromise = this.getSentRequests(currentUserId);
    const getrequestsPromise = this.getRequests(currentUserId);
    const recommendationsPromise =
      this.friendsRepository.recommendFriends(currentUserId);

    const [sentRequests, recommendations, getRequests] = await Promise.all([
      sentRequestsPromise,
      recommendationsPromise,
      getrequestsPromise,
    ]);

    return recommendations.map((recommendation) => {
      const sentRequest = sentRequests.find(
        (request) => request.id === recommendation.id,
      );

      const getRequest = getRequests.find(
        (request) => request.id === recommendation.id,
      );

      return {
        ...recommendation,
        sentRequest: sentRequest || getRequest ? true : false,
      };
    });
  }

  async searchByuserName(currentUserId: number, username: string) {
    const userFriendsPromise = this.getAllFriends(currentUserId);
    const searchedUserPromise = this.usersService.searchByUserName(username);

    const [userFriends, searchedUser] = await Promise.all([
      userFriendsPromise,
      searchedUserPromise,
    ]);

    return searchedUser.map((searchedUser) => {
      const friend = userFriends.find(
        (friend) => friend.id === searchedUser.id,
      );

      return {
        ...searchedUser,
        isFriend: friend ? true : false,
      };
    });
  }
}
