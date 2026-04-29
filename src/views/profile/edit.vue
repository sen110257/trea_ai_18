<template>
  <div class="profile-edit-page page-container-no-tabbar">
    <PageHeader title="编辑资料" />

    <div class="edit-content">
      <div class="avatar-section">
        <div class="avatar-wrapper">
          <div class="avatar">
            <van-icon name="user-o" size="32" color="#D4AF37" />
          </div>
          <div class="avatar-edit" @click="changeAvatar">
            <van-icon name="photograph" size="16" color="#FFFFFF" />
          </div>
        </div>
        <p class="avatar-tip">点击更换头像</p>
      </div>

      <van-cell-group inset title="基本信息">
        <van-cell title="昵称" is-link>
          <template #right-icon>
            <van-field
              v-model="editForm.nickname"
              placeholder="请输入昵称"
              :border="false"
              align="right"
              maxlength="20"
            />
          </template>
        </van-cell>
        <van-cell title="性别" is-link @click="showGenderPicker = true">
          <template #right-icon>
            <span :class="{ 'placeholder-text': !editForm.gender }">
              {{ editForm.gender || '请选择' }}
            </span>
          </template>
        </van-cell>
        <van-cell title="生日" is-link @click="showDatePicker = true">
          <template #right-icon>
            <span :class="{ 'placeholder-text': !editForm.birthday }">
              {{ editForm.birthday || '请选择' }}
            </span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group inset title="联系方式">
        <van-cell title="手机号">
          <template #right-icon>
            <span class="phone-text">{{ editForm.phone }}</span>
          </template>
        </van-cell>
        <van-cell title="邮箱" is-link>
          <template #right-icon>
            <van-field
              v-model="editForm.email"
              type="email"
              placeholder="请输入邮箱"
              :border="false"
              align="right"
              maxlength="50"
            />
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group inset title="其他信息">
        <van-cell title="所在城市" is-link @click="showAreaPicker = true">
          <template #right-icon>
            <span :class="{ 'placeholder-text': !editForm.city }">
              {{ editForm.city || '请选择' }}
            </span>
          </template>
        </van-cell>
      </van-cell-group>

      <div class="save-section">
        <van-button class="btn-save" block @click="handleSave">
          保存修改
        </van-button>
      </div>
    </div>

    <van-popup v-model:show="showGenderPicker" position="bottom">
      <van-picker
        title="选择性别"
        :columns="genderOptions"
        @confirm="onGenderConfirm"
        @cancel="showGenderPicker = false"
      />
    </van-popup>

    <van-calendar
      v-model:show="showDatePicker"
      v-model="currentDate"
      type="single"
      title="选择生日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onDateConfirm"
    />

    <van-popup v-model:show="showAreaPicker" position="bottom">
      <van-area
        title="选择城市"
        :area-list="areaList"
        @confirm="onAreaConfirm"
        @cancel="showAreaPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { useUserStore } from '@/store/user.js'

const router = useRouter()
const userStore = useUserStore()

const showGenderPicker = ref(false)
const showDatePicker = ref(false)
const showAreaPicker = ref(false)
const currentDate = ref(new Date())

const genderOptions = [
  { text: '男', value: '男' },
  { text: '女', value: '女' },
  { text: '保密', value: '保密' }
]

const minDate = new Date(1950, 0, 1)
const maxDate = new Date()

const areaList = {
  province_list: {
    110000: '北京市',
    310000: '上海市',
    440000: '广东省',
    330000: '浙江省',
    320000: '江苏省'
  },
  city_list: {
    110100: '北京市',
    310100: '上海市',
    440100: '广州市',
    440300: '深圳市',
    330100: '杭州市',
    320100: '南京市'
  },
  county_list: {}
}

const editForm = reactive({
  nickname: '',
  gender: '',
  birthday: '',
  phone: '138****8888',
  email: '',
  city: ''
})

const changeAvatar = () => {
  showToast('请选择图片')
}

const onGenderConfirm = ({ selectedValues }) => {
  editForm.gender = selectedValues[0]
  showGenderPicker.value = false
}

const onDateConfirm = (value) => {
  const date = value || currentDate.value
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  editForm.birthday = `${year}年${month}月${day}日`
  showDatePicker.value = false
}

const onAreaConfirm = ({ selectedValues }) => {
  editForm.city = selectedValues.join(' / ')
  showAreaPicker.value = false
}

const handleSave = () => {
  if (!editForm.nickname.trim()) {
    showToast('请输入昵称')
    return
  }

  showSuccessToast('保存成功')
  setTimeout(() => {
    router.back()
  }, 500)
}

onMounted(() => {
  if (userStore.userInfo) {
    editForm.nickname = userStore.userInfo.name || ''
    editForm.phone = userStore.userInfo.phone || '138****8888'
  }
})
</script>

<style lang="less" scoped>
.profile-edit-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
}

.edit-content {
  padding-bottom: 20px;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  background: #FFFFFF;
  margin-bottom: 12px;

  .avatar-wrapper {
    position: relative;

    .avatar {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 230, 200, 0.3));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(212, 175, 55, 0.2);
    }

    .avatar-edit {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #FFFFFF;
    }
  }

  .avatar-tip {
    font-size: 12px;
    color: #999999;
    margin-top: 12px;
  }
}

.placeholder-text {
  color: #999999;
}

.phone-text {
  color: #666666;
}

.save-section {
  padding: 24px 16px;

  .btn-save {
    height: 44px;
    border-radius: 22px;
    background: linear-gradient(135deg, #D4AF37, #F5E6C8);
    border: none;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 600;
  }
}
</style>
