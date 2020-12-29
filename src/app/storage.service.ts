import { Injectable } from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import * as hash from 'object-hash';
import { v4 as uuidv4 } from 'uuid';

interface StorageSubscription {
  subscriptionKey: string;
  storageKey: string;
  lastHashValue: string;
  callback: (updatedValue: any) => void;
}

const POLL_FREQUENCY = 250;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // subscriptions
  private subscriptions: Map<string, StorageSubscription> = new Map();

  constructor(private storage: StorageMap) {
    setInterval(async () => {
      for (const subscription of this.subscriptions.values()) {
        await this.checkSubscription(subscription);
      }
    }, POLL_FREQUENCY);
  }

  async get(key: string): Promise<any> {
    return await this.storage.get(key).toPromise();
  }

  async set(key: string, value: any, isSubscribable: boolean = false): Promise<void> {

    await this.storage.set(key, value).toPromise();

    if (isSubscribable) {
      // Store the hash value, so that other tabs can poll for the value and detect changes
      // that they didn't necessarily make
      const hashValue = hash(value, {algorithm: 'sha1'});
      await this.storage.set(this.getHashKey(key), hashValue).toPromise();
    }
  }

  generateSubscription(storageKey: string, callback: (updatedValue: any) => void): string {
    const subscriptionUuid = uuidv4();

    const newSubscription = {
      storageKey,
      callback,
      subscriptionKey: subscriptionUuid,
      lastHashValue: ''
    } as StorageSubscription;

    this.subscriptions.set(subscriptionUuid, newSubscription);

    // Kick off subscription so there's not a weird POLL_FREQUENCY delay
    setTimeout(async () => {
      await this.checkSubscription(newSubscription);
    }, 1);

    return subscriptionUuid;
  }

  cancelSubscription(subscriptionKey: string): void {
    this.subscriptions.delete(subscriptionKey);
  }

  async checkSubscription(subscription: StorageSubscription): Promise<void> {
    const fetchedHashValue = await this.storage.get(this.getHashKey(subscription.storageKey)).toPromise();
    if (!fetchedHashValue) {
      console.error('Subscription checked on storage key ' + subscription.storageKey
        + ', please make sure it is being set with isSubscribable=true');
      return;
    }

    const newHashValue = fetchedHashValue as string;
    if (newHashValue === subscription.lastHashValue) {
      return;
    }

    subscription.callback(
      await this.get(subscription.storageKey)
    );

    subscription.lastHashValue = newHashValue;

    this.subscriptions.set(subscription.subscriptionKey, subscription);
  }

  getHashKey(key: string): string {
    return key + '-sha1';
  }

  async clearAll(): Promise<void> {
    await this.storage.clear().toPromise();
  }

  async delete(key: string): Promise<void> {
    await this.storage.delete(key).toPromise();
  }
}
