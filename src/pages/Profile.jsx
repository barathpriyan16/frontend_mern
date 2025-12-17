import React, { useContext, useState, useRef } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'
import { AuthContext } from '../context/AuthContext'
import { motion } from 'framer-motion'

export default function Profile(){
  const { profile, updateProfile } = useContext(ExpenseContext)
  const { logout } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile)
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target.result
        setFormData(prev => ({...prev, profileImage: imageData}))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Profile</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Manage your account settings and preferences</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 shadow-lg transition-all font-medium"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 shadow-lg transition-all font-medium"
          >
            Logout
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 xl:grid-cols-3 gap-8"
      >
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="xl:col-span-1"
        >
          <div className="p-8 onero-card rounded-xl text-center h-fit">
            <div className="relative inline-block mb-6">
              <div className="w-36 h-36 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 mx-auto border-4 border-white dark:border-gray-700 shadow-xl">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                    👤
                  </div>
                )}
              </div>
              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-full hover:from-indigo-600 hover:to-purple-700 shadow-lg transition-all"
                >
                  📷
                </motion.button>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{formData.name}</h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium">{formData.email}</p>
            <div className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Budget: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{profile.currency} {profile.budget.toLocaleString()}</span></p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="xl:col-span-2"
        >
          <div className="p-8 onero-card rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    className="w-full p-3 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                ) : (
                  <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                    <p className="font-medium text-gray-900 dark:text-white">{profile.name}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    className="w-full p-3 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                ) : (
                  <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                    <p className="font-medium text-gray-900 dark:text-white">{profile.email}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Monthly Budget</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({...prev, budget: Number(e.target.value)}))}
                    className="w-full p-3 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                ) : (
                  <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                    <p className="font-bold text-emerald-700 dark:text-emerald-400 text-lg">{profile.currency} {profile.budget.toLocaleString()}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                {isEditing ? (
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData(prev => ({...prev, currency: e.target.value}))}
                    className="w-full p-3 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="₹">₹ INR</option>
                    <option value="$">$ USD</option>
                    <option value="€">€ EUR</option>
                    <option value="£">£ GBP</option>
                  </select>
                ) : (
                  <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                    <p className="font-medium text-gray-900 dark:text-white">{profile.currency}</p>
                  </div>
                )}
              </div>
            </div>
            {isEditing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 mt-8 pt-6 border-t border-indigo-100 dark:border-indigo-800"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 shadow-lg transition-all font-medium"
                >
                  Save Changes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg hover:from-slate-600 hover:to-slate-700 shadow-lg transition-all font-medium"
                >
                  Cancel
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
