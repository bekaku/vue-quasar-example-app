<script setup lang="ts">
import { biEmojiSmile, biReply, biThreeDotsVertical } from '@quasar/extras/bootstrap-icons';

const props = withDefaults(
  defineProps<{
    height?: number;
    autofocus?: boolean;
  }>(),
  {
    height: 450,
    autofocus: false
  }
);
</script>

<template>
  <div class="row ">
    <div class="col-12">
      <q-chat-message name="Jane" size="6" avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['Quasar supplies a chat']" stamp="4 minutes ago" text-color="white" bg-color="message-sent"
        :sent="true">
        <div>
          Quasar supplies a chat component called QChatMessage which is really a chat entry that renders the data given
          by
          <div class="absolute-bottom-left q-text-black" style="left: -75px;">
            <q-btn flat round dense size="sm" :icon="biThreeDotsVertical">
              <q-menu>
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>
                        Menu 1
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>
                        Menu 1
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-btn flat round dense size="sm" :icon="biReply"></q-btn>
            <q-btn flat round dense size="sm" :icon="biEmojiSmile"></q-btn>
          </div>

        </div>

      </q-chat-message>
    </div>
  </div>
  <div class="row ">
    <div class="col-12">
      <q-chat-message name="Jane" size="6" avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['Quasar supplies a chat']" stamp="4 minutes ago" :text-color="$q.dark.isActive ? 'white' : 'black'"
        bg-color="message-received" :sent="false">
        <div>
          Quasar supplies a chat component called QChatMessage which is really a chat entry that renders the data given

          <div class="absolute-bottom-right" style="right: -75px;">
            <q-btn flat round dense size="sm" :icon="biEmojiSmile"></q-btn>
            <q-btn flat round dense size="sm" :icon="biReply"></q-btn>
            <q-btn flat round dense size="sm" :icon="biThreeDotsVertical"></q-btn>
          </div>
        </div>

      </q-chat-message>
    </div>
  </div>


  <!--  <div class="row justify-end">-->
  <!--    <div class="col-7 test-border">-->
  <!--      <q-btn-->
  <!--        flat round dense-->
  <!--        size="sm"-->
  <!--        :icon="biThreeDotsVertical"-->
  <!--      >-->
  <!--        <q-menu>-->
  <!--          <q-list>-->
  <!--            <q-item>-->
  <!--              <q-item-section>-->
  <!--                <q-item-label>-->
  <!--                  Menu 1-->
  <!--                </q-item-label>-->
  <!--              </q-item-section>-->
  <!--            </q-item>-->
  <!--            <q-item>-->
  <!--              <q-item-section>-->
  <!--                <q-item-label>-->
  <!--                  Menu 1-->
  <!--                </q-item-label>-->
  <!--              </q-item-section>-->
  <!--            </q-item>-->
  <!--            <q-item>-->
  <!--              <q-item-section>-->
  <!--                <q-item-label>-->
  <!--                  Menu 1-->
  <!--                </q-item-label>-->
  <!--              </q-item-section>-->
  <!--            </q-item>-->
  <!--          </q-list>-->
  <!--        </q-menu>-->
  <!--      </q-btn>-->
  <!--    </div>-->

  <!--  </div>-->


  <!--  <q-chat-message-->
  <!--    sent-->
  <!--    bg-color="message-sent"-->
  <!--    text-color="white"-->
  <!--    size="6"-->
  <!--  >-->
  <!--    <template v-slot:name>me</template>-->
  <!--    <template v-slot:stamp>7 minutes ago</template>-->
  <!--    <template v-slot:avatar>-->
  <!--      <base-avatar-->
  <!--        class="q-message-avatar q-message-avatar&#45;&#45;sent"-->
  <!--        src="https://cdn.quasar.dev/img/avatar4.jpg"-->
  <!--        :fetch-image="false" />-->
  <!--    </template>-->
  <!--    <div>-->
  <!--      Have you seen Quasar?-->
  <!--    </div>-->
  <!--    <div>-->
  <!--      Quasar supplies a chat component called QChatMessage which is really a chat entry that renders the data given by-->
  <!--      the props.-->
  <!--    </div>-->
  <!--  </q-chat-message>-->
  <!--  <q-chat-message-->
  <!--    name="Jane"-->
  <!--    avatar="https://cdn.quasar.dev/img/avatar5.jpg"-->
  <!--    :text="['doing fine, how r you?']"-->
  <!--    stamp="4 minutes ago"-->
  <!--    :text-color="$q.dark.isActive? 'white': 'black'"-->
  <!--    bg-color="message-received"-->
  <!--  />-->
  <!--  <q-chat-message-->
  <!--    bg-color="message-received"-->
  <!--    :text-color="$q.dark.isActive? 'white': 'black'"-->
  <!--    size="6"-->
  <!--  >-->
  <!--    <template v-slot:name>Mary</template>-->
  <!--    <template v-slot:stamp>7 minutes ago</template>-->
  <!--    <template v-slot:avatar>-->
  <!--      <base-avatar-->
  <!--        class="q-message-avatar q-message-avatar&#45;&#45;received"-->
  <!--        src="https://cdn.quasar.dev/img/avatar2.jpg"-->
  <!--        :fetch-image="false" />-->
  <!--    </template>-->

  <!--    <div>-->
  <!--      Already building an app with it...-->
  <!--      <div class="row">-->
  <!--        <div class="col-4 q-pa-xs">-->
  <!--          <q-img-->
  <!--            style="border-radius: 10px"-->
  <!--            :ratio="4/3"-->
  <!--            src="https://images.pexels.com/photos/19794931/pexels-photo-19794931/free-photo-of-woman-holding-a-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">-->
  <!--          </q-img>-->
  <!--        </div>-->
  <!--        <div class="col-4 q-pa-xs">-->
  <!--          <q-img-->
  <!--            style="border-radius: 10px"-->
  <!--            :ratio="4/3"-->
  <!--            src="https://images.pexels.com/photos/19794931/pexels-photo-19794931/free-photo-of-woman-holding-a-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">-->
  <!--          </q-img>-->
  <!--        </div>-->
  <!--        <div class="col-4 q-pa-xs">-->
  <!--          <q-img-->
  <!--            style="border-radius: 10px"-->
  <!--            :ratio="4/3"-->
  <!--            src="https://images.pexels.com/photos/19794931/pexels-photo-19794931/free-photo-of-woman-holding-a-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">-->
  <!--          </q-img>-->
  <!--        </div>-->

  <!--      </div>-->
  <!--    </div>-->
  <!--  </q-chat-message>-->
  <!--  <q-chat-message-->
  <!--    name="Jane"-->
  <!--    avatar="https://cdn.quasar.dev/img/avatar3.jpg"-->
  <!--    :text="['doing fine, how r you?']"-->
  <!--    stamp="4 minutes ago"-->
  <!--    :text-color="$q.dark.isActive? 'white': 'black'"-->
  <!--    bg-color="message-received"-->
  <!--  />-->
  <!--  <q-chat-message-->
  <!--    name="Jane"-->
  <!--    avatar="https://cdn.quasar.dev/img/avatar3.jpg"-->
  <!--    :text="['doing fine, how r you?']"-->
  <!--    stamp="4 minutes ago"-->
  <!--    :text-color="$q.dark.isActive? 'white': 'black'"-->
  <!--    bg-color="message-received"-->
  <!--  />-->
  <!--  <q-chat-message-->
  <!--    name="Jane"-->
  <!--    avatar="https://cdn.quasar.dev/img/avatar3.jpg"-->
  <!--    :text="['doing fine, how r you?']"-->
  <!--    stamp="4 minutes ago"-->
  <!--    :text-color="$q.dark.isActive? 'white': 'black'"-->
  <!--    bg-color="message-received"-->
  <!--  />-->
  <!--  <q-chat-message-->
  <!--    name="Jane"-->
  <!--    avatar="https://cdn.quasar.dev/img/avatar3.jpg"-->
  <!--    :text="['doing fine, how r you?']"-->
  <!--    stamp="4 minutes ago"-->
  <!--    :text-color="$q.dark.isActive? 'white': 'black'"-->
  <!--    bg-color="message-received"-->
  <!--  />-->
  <!--  <q-chat-message-->
  <!--    name="Jane"-->
  <!--    avatar="https://cdn.quasar.dev/img/avatar3.jpg"-->
  <!--    :text="['doing fine, how r you?']"-->
  <!--    stamp="4 minutes ago"-->
  <!--    :text-color="$q.dark.isActive? 'white': 'black'"-->
  <!--    bg-color="message-received"-->
  <!--  />-->
  <!--  <q-chat-message-->
  <!--    name="Jane"-->
  <!--    avatar="https://cdn.quasar.dev/img/avatar3.jpg"-->
  <!--    :text="['doing fine, how r you?']"-->
  <!--    stamp="4 minutes ago"-->
  <!--    :text-color="$q.dark.isActive? 'white': 'black'"-->
  <!--    bg-color="message-received"-->
  <!--  />-->
</template>

<style scoped lang="scss">
.text-veeeeee {
  color: #a2aa33 !important;
}

.bg-sent-test {
  background: red !important;
}
</style>
